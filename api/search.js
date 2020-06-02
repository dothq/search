const axios = require("axios")
const { parse } = require("url")
const { v4 } = require("uuid");

const { SEARCH_EP_WITH_KEY, AUTOCOMPLETE_EP_WITH_KEY } = require("./ENGINE_KEYS.json")

var entities = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
}
  
const decodeHTMLEntities = (text) => {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
      return entities[entity] || match
    })
}

const removeBoldTags = (text) => {
    return text.replace(/<b>/g, "[b]").replace(/<\/b>/g, "[/b]")
}

const getDescription = (desc) => {
    return desc.length >= 151 ? desc.substr(0, 150) + "..." : desc
}

const generateSchema = (item, index) => {
    const parsed = parse(item.url);

    item.score = index/10
    item.favicon = `https://search.dothq.co/api/favicon/${parsed.hostname}`
    item.id = v4()

    item.content = decodeHTMLEntities(getDescription(removeBoldTags((item.desc))))
    item.title = decodeHTMLEntities(removeBoldTags(item.title))

    const prettyURL = [parsed.hostname]

    parsed.pathname.split("/").forEach(path => {
        if(path == "") return;
        prettyURL.push(path)
    })

    item.url = {
        url: item.url,
        prettified: prettyURL
    }
    
    delete item.source
    delete item._id
    delete item.desc
    delete item.position

    return item;
}

const getUA = () => {
    let orig = "Mozilla/5.0 (Windows NT %wndwsvr.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) %brwsrme/%crmajor.0.%crbd.0 Mobile Safari/537.36"

    let browsers = ['Dro', 'Pro', 'Sro', 'Vro', 'Bro', 'Qro', 'Wro', 'Tro', 'Yro', 'Uro', 'Aro', 'Hro']

    orig = orig.replace(/%brwsr/, browsers[~~(browsers.length * Math.random())])
    orig = orig.replace(/%crmajor/, ~~(Math.random() * 30) + 100)
    orig = orig.replace(/%crbd/, ~~(Math.random() * 1000) + 9999)
    orig = orig.replace(/%wndwsvr/, ~~(Math.random() * 1) + 10)

    return orig;
}

const search = (query, options) => {
    return new Promise((resolve, reject) => {
        const userAgent = getUA() // Generate a random UA for the engine lookup

        const data = {
            totalResults: 0,
            timeTaken: Date.now(),
            results: [],
            userAgent
        }

        if(!options) options = { category: 'pages', safesearch: true, language: 'en_US' };

        const category = options.category == "pages" ? "web" : options.category; // Only display results for the user's specified category
        const safesearch = options.safesearch == true ? 1 : 0; // Use the user's safesearch options or enable by default
        const language = options.language; // Use the user's specified language or use the default en_US
        const device = 'desktop'

        const engineURL = SEARCH_EP_WITH_KEY
                            .replace(/%category/, category)
                            .replace(/%device/, device)
                            .replace(/%ss/, safesearch)
                            .replace(/%language/, language)
                            .replace(/%query/, query)

        axios.get(engineURL, { headers: { 'User-Agent': userAgent } })
            .then(async res => {
                data.totalResults = res.data.data.result.items.length;

                var i = data.totalResults;

                for(key in res.data.data.result.items) {
                    let item = res.data.data.result.items[key]

                    item = generateSchema(item, i)

                    --i;

                    data.results.push(item)
                }

                resolve(data)
            }).catch(error => {
                resolve({ ok: false, captcha: true, timeTaken: Date.now() })
            })
    })
}

const autocomplete = (query) => {
    return new Promise((resolve, reject) => {
        const userAgent = getUA()

        axios.get(`${AUTOCOMPLETE_EP_WITH_KEY}&q=${query}`, { headers: { 'User-Agent': userAgent } })
            .then(res => {
                var data = [userAgent]

                res.data.forEach(({ phrase }) => {
                    data.push(phrase)
                })

                resolve(data)
            })
    })
}

module.exports = { search, autocomplete };