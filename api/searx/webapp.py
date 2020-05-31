#!/usr/bin/env python

'''
searx is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

searx is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with searx. If not, see < http://www.gnu.org/licenses/ >.

(C) 2013- by Adam Tauber, <asciimoo@gmail.com>
'''

if __name__ == '__main__':
    from sys import path
    from os.path import realpath, dirname
    path.append(realpath(dirname(realpath(__file__)) + '/../'))

import hashlib
import hmac
import json
import os
import sys

import requests

from searx import logger
logger = logger.getChild('webapp')

from six import next
from datetime import datetime, timedelta
from time import time
from werkzeug.middleware.proxy_fix import ProxyFix
from flask import (
    Flask, request, render_template, url_for, Response, make_response,
    redirect, send_from_directory
)
from flask_babel import Babel, gettext, format_date
from flask.ctx import has_request_context
from flask.json import jsonify
from searx import brand
from searx import settings, searx_dir, searx_debug
from searx.exceptions import SearxParameterException
from searx.engines import (
    categories, engines, engine_shortcuts, get_engines_stats, initialize_engines
)
from searx.utils import (
    UnicodeWriter, highlight_content, html_to_text, get_resources_directory,
    get_result_templates, get_themes, gen_useragent,
    dict_subset, prettify_url, match_language
)
from searx.version import VERSION_STRING
from searx.languages import language_codes as languages
from searx.search import SearchWithPlugins, get_search_query_from_webapp
from searx.query import RawTextQuery
from searx.autocomplete import backends as autocomplete_backends
from searx.plugins import plugins
from searx.plugins.oa_doi_rewrite import get_doi_resolver
from searx.preferences import Preferences, ValidationException, LANGUAGE_CODES
from searx.answerers import answerers
from searx.url_utils import urlencode, urlparse, urljoin
from searx.utils import new_hmac

# check if the pyopenssl package is installed.
# It is needed for SSL connection without trouble, see #298
try:
    import OpenSSL.SSL  # NOQA
except ImportError:
    logger.critical("The pyopenssl package has to be installed.\n"
                    "Some HTTPS connections will fail")

from io import StringIO


if sys.version_info[0] == 3:
    unicode = str
    PY3 = True
else:
    PY3 = False
    logger.warning('\033[1;31m *** Deprecation Warning ***\033[0m')
    logger.warning('\033[1;31m Python2 is deprecated\033[0m')

# serve pages with HTTP/1.1
from werkzeug.serving import WSGIRequestHandler
WSGIRequestHandler.protocol_version = "HTTP/{}".format(settings['server'].get('http_protocol_version', '1.0'))

# Flask app
app = Flask(
    __name__
)


app.secret_key = settings['server']['secret_key']

if not searx_debug \
   or os.environ.get("WERKZEUG_RUN_MAIN") == "true" \
   or os.environ.get('UWSGI_ORIGINAL_PROC_NAME') is not None:
    initialize_engines(settings['engines'])

babel = Babel(app)

rtl_locales = ['ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he',
               'ku', 'mzn', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi']

# used when translating category names
_category_names = (gettext('files'),
                   gettext('general'),
                   gettext('music'),
                   gettext('social media'),
                   gettext('images'),
                   gettext('videos'),
                   gettext('it'),
                   gettext('news'),
                   gettext('map'),
                   gettext('science'))

outgoing_proxies = settings['outgoing'].get('proxies') or None


def _get_browser_language(request, lang_list):
    for lang in request.headers.get("Accept-Language", "en").split(","):
        if ';' in lang:
            lang = lang.split(';')[0]
        locale = match_language(lang, lang_list, fallback=None)
        if locale is not None:
            return locale
    return settings['search']['default_lang'] or 'en'


@babel.localeselector
def get_locale():
    locale = _get_browser_language(request, settings['locales'].keys())

    logger.debug("default locale from browser info is `%s`", locale)

    if request.preferences.get_value('locale') != '':
        locale = request.preferences.get_value('locale')

    if 'locale' in request.form\
       and request.form['locale'] in settings['locales']:
        locale = request.form['locale']

    if locale == 'zh_TW':
        locale = 'zh_Hant_TW'

    if locale == 'oc':
        request.form['use-translation'] = 'oc'
        locale = 'fr_FR'

    logger.debug("selected locale is `%s`", locale)

    return locale


def get_base_url():
    if settings['server']['base_url']:
        hostname = settings['server']['base_url']
    else:
        scheme = 'http'
        if request.is_secure:
            scheme = 'https'
        hostname = url_for('index', _external=True, _scheme=scheme)
    return hostname


def proxify(url):
    if url.startswith('//'):
        url = 'https:' + url

    if not settings.get('result_proxy'):
        return url

    url_params = dict(mortyurl=url.encode('utf-8'))

    if settings['result_proxy'].get('key'):
        url_params['mortyhash'] = hmac.new(settings['result_proxy']['key'],
                                           url.encode('utf-8'),
                                           hashlib.sha256).hexdigest()

    return '{0}?{1}'.format(settings['result_proxy']['url'],
                            urlencode(url_params))


def image_proxify(url):

    if url.startswith('//'):
        url = 'https:' + url

    if not request.preferences.get_value('image_proxy'):
        return url

    if url.startswith('data:image/jpeg;base64,'):
        return url

    if settings.get('result_proxy'):
        return proxify(url)

    h = new_hmac(settings['server']['secret_key'], url.encode('utf-8'))

    return '{0}?{1}'.format(url_for('image_proxy'),
                            urlencode(dict(url=url.encode('utf-8'), h=h)))


@app.before_request
def pre_request():
    request.start_time = time()
    request.timings = []
    request.errors = []

    preferences = Preferences(themes, list(categories.keys()), engines, plugins)
    request.preferences = preferences
    try:
        preferences.parse_dict(request.cookies)
    except Exception:
        request.errors.append(gettext('Invalid settings, please edit your preferences'))

    # merge GET, POST vars
    # request.form
    request.form = dict(request.form.items())
    for k, v in request.args.items():
        if k not in request.form:
            request.form[k] = v

    if request.form.get('preferences'):
        preferences.parse_encoded_data(request.form['preferences'])
    else:
        try:
            preferences.parse_dict(request.form)
        except Exception as e:
            logger.exception('invalid settings')
            request.errors.append(gettext('Invalid settings'))

    # init search language and locale
    if not preferences.get_value("language"):
        preferences.parse_dict({"language": _get_browser_language(request, LANGUAGE_CODES)})
    if not preferences.get_value("locale"):
        preferences.parse_dict({"locale": get_locale()})

    # request.user_plugins
    request.user_plugins = []
    allowed_plugins = preferences.plugins.get_enabled()
    disabled_plugins = preferences.plugins.get_disabled()
    for plugin in plugins:
        if ((plugin.default_on and plugin.id not in disabled_plugins) or plugin.id in allowed_plugins):
            request.user_plugins.append(plugin)


@app.after_request
def post_request(response):
    total_time = time() - request.start_time
    timings_all = ['total;dur=' + str(round(total_time * 1000, 3))]
    if len(request.timings) > 0:
        timings = sorted(request.timings, key=lambda v: v['total'])
        timings_total = ['total_' + str(i) + '_' + v['engine'] + ';dur=' + str(round(v['total'] * 1000, 3)) for i, v in enumerate(timings)]
        timings_load = ['load_' + str(i) + '_' + v['engine'] + ';dur=' + str(round(v['load'] * 1000, 3)) for i, v in enumerate(timings)]
        timings_all = timings_all + timings_total + timings_load
    response.headers.add('Server-Timing', ', '.join(timings_all))
    return response


def index_error(error_message):
    return Response(json.dumps({'error': error_message}),
                    mimetype='application/json')


@app.route('/search', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def index():

    # output_format
    output_format = 'json'

    # check if there is query
    if request.form.get('q') is None:
        return index_error('No query'), 400

    # search
    search_query = None
    raw_text_query = None
    result_container = None
    try:
        search_query, raw_text_query = get_search_query_from_webapp(request.preferences, request.form)
        # search = Search(search_query) #  without plugins
        search = SearchWithPlugins(search_query, request.user_plugins, request)
        result_container = search.search()
    except Exception as e:
        # log exception
        logger.exception('search error')

        # is it an invalid input parameter or something else ?
        if (issubclass(e.__class__, SearxParameterException)):
            return index_error(e.message), 400
        else:
            return index_error(gettext('search error')), 500

    # results
    results = result_container.get_ordered_results()
    number_of_results = result_container.results_number()
    if number_of_results < result_container.results_length():
        number_of_results = 0

    # UI
    advanced_search = request.form.get('advanced_search', None)

    # Server-Timing header
    request.timings = result_container.get_timings()

    # output
    for result in results:
        if result.get('content'):
            result['content'] = html_to_text(result['content']).strip()
        # removing html content and whitespace duplications
        result['title'] = ' '.join(html_to_text(result['title']).strip().split())

        if 'url' in result:
            result['pretty_url'] = prettify_url(result['url'])

        # TODO, check if timezone is calculated right
        if 'publishedDate' in result:
            try:  # test if publishedDate >= 1900 (datetime module bug)
                result['pubdate'] = result['publishedDate'].strftime('%Y-%m-%d %H:%M:%S%z')
            except ValueError:
                result['publishedDate'] = None
            else:
                if result['publishedDate'].replace(tzinfo=None) >= datetime.now() - timedelta(days=1):
                    timedifference = datetime.now() - result['publishedDate'].replace(tzinfo=None)
                    minutes = int((timedifference.seconds / 60) % 60)
                    hours = int(timedifference.seconds / 60 / 60)
                    if hours == 0:
                        result['publishedDate'] = gettext(u'{minutes} minute(s) ago').format(minutes=minutes)
                    else:
                        result['publishedDate'] = gettext(u'{hours} hour(s), {minutes} minute(s) ago').format(hours=hours, minutes=minutes)  # noqa
                else:
                    result['publishedDate'] = format_date(result['publishedDate'])

    return Response(json.dumps({'query': search_query.query.decode('utf-8'),
                                'number_of_results': number_of_results,
                                'results': results,
                                'answers': list(result_container.answers),
                                'corrections': list(result_container.corrections),
                                'infoboxes': result_container.infoboxes,
                                'suggestions': list(result_container.suggestions),
                                'unresponsive_engines': __get_translated_errors(result_container.unresponsive_engines)},  # noqa
                                default=lambda item: list(item) if isinstance(item, set) else item),
                        mimetype='application/json')


def __get_translated_errors(unresponsive_engines):
    translated_errors = []
    for unresponsive_engine in unresponsive_engines:
        error_msg = gettext(unresponsive_engine[1])
        if unresponsive_engine[2]:
            error_msg = "{} {}".format(error_msg, unresponsive_engine[2])
        translated_errors.append((unresponsive_engine[0], error_msg))
    return translated_errors


@app.route('/autocompleter', methods=['GET', 'POST'])
def autocompleter():
    """Return autocompleter results"""

    # set blocked engines
    disabled_engines = request.preferences.engines.get_disabled()

    # parse query
    if PY3:
        raw_text_query = RawTextQuery(request.form.get('q', b''), disabled_engines)
    else:
        raw_text_query = RawTextQuery(request.form.get('q', u'').encode('utf-8'), disabled_engines)
    raw_text_query.parse_query()

    # check if search query is set
    if not raw_text_query.getSearchQuery():
        return '', 400

    # run autocompleter
    completer = autocomplete_backends.get(request.preferences.get_value('autocomplete'))

    # get language from cookie
    language = request.preferences.get_value('language')
    if not language or language == 'all':
        language = 'en'
    else:
        language = language.split('-')[0]
    # run autocompletion
    raw_results = completer(raw_text_query.getSearchQuery(), language)

    # parse results (write :language and !engine back to result string)
    results = []
    for result in raw_results:
        raw_text_query.changeSearchQuery(result)

        # add parsed result
        results.append(raw_text_query.getFullQuery())

    # return autocompleter results
    if request.form.get('format') == 'x-suggestions':
        return Response(json.dumps([raw_text_query.query, results]),
                        mimetype='application/json')

    return Response(json.dumps(results),
                    mimetype='application/json')


def _is_selected_language_supported(engine, preferences):
    language = preferences.get_value('language')
    return (language == 'all' or match_language(
        language,
        getattr(engine, 'supported_languages', []),
        getattr(engine, 'language_aliases', {}), None)
    )


@app.route('/image_proxy', methods=['GET'])
def image_proxy():
    url = request.args.get('url').encode('utf-8')

    if not url:
        return '', 400

    h = new_hmac(settings['server']['secret_key'], url)

    if h != request.args.get('h'):
        return '', 400

    headers = dict_subset(request.headers, {'If-Modified-Since', 'If-None-Match'})
    headers['User-Agent'] = gen_useragent()

    resp = requests.get(url,
                        stream=True,
                        timeout=settings['outgoing']['request_timeout'],
                        headers=headers,
                        proxies=outgoing_proxies)

    if resp.status_code == 304:
        return '', resp.status_code

    if resp.status_code != 200:
        logger.debug('image-proxy: wrong response code: {0}'.format(resp.status_code))
        if resp.status_code >= 400:
            return '', resp.status_code
        return '', 400

    if not resp.headers.get('content-type', '').startswith('image/'):
        logger.debug('image-proxy: wrong content-type: {0}'.format(resp.headers.get('content-type')))
        return '', 400

    img = b''
    chunk_counter = 0

    for chunk in resp.iter_content(1024 * 1024):
        chunk_counter += 1
        if chunk_counter > 5:
            return '', 502  # Bad gateway - file is too big (>5M)
        img += chunk

    headers = dict_subset(resp.headers, {'Content-Length', 'Length', 'Date', 'Last-Modified', 'Expires', 'Etag'})

    return Response(img, mimetype=resp.headers['content-type'], headers=headers)


@app.errorhandler(404)
def page_not_found(e):
    return index_error('Not Found'), 404


def run():
    logger.debug('starting webserver on %s:%s', settings['server']['bind_address'], settings['server']['port'])
    app.run(
        debug=searx_debug,
        use_debugger=searx_debug,
        port=settings['server']['port'],
        host=settings['server']['bind_address'],
        threaded=True
    )


class ReverseProxyPathFix(object):
    '''Wrap the application in this middleware and configure the
    front-end server to add these headers, to let you quietly bind
    this to a URL other than / and to an HTTP scheme that is
    different than what is used locally.

    http://flask.pocoo.org/snippets/35/

    In nginx:
    location /myprefix {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Script-Name /myprefix;
        }

    :param app: the WSGI application
    '''

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        script_name = environ.get('HTTP_X_SCRIPT_NAME', '')
        if script_name:
            environ['SCRIPT_NAME'] = script_name
            path_info = environ['PATH_INFO']
            if path_info.startswith(script_name):
                environ['PATH_INFO'] = path_info[len(script_name):]

        scheme = environ.get('HTTP_X_SCHEME', '')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)


application = app
# patch app to handle non root url-s behind proxy & wsgi
app.wsgi_app = ReverseProxyPathFix(ProxyFix(application.wsgi_app))

if __name__ == "__main__":
    run()
