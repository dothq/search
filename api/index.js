const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { search, autocomplete } = require("./search")

const rateLimit = require("express-rate-limit");

app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5
});

const whitelist = ['http://localhost:8000', 'https://search.dothq.co']

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin && whitelist.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.get('/', (req, res) => {
  res.redirect('https://search.dothq.co')
})

app.post('/v1/search', limiter, (req, res) => {
    search(req.body.query, req.body.options ? JSON.parse(req.body.options) : "").then(resp => {
        resp.timeTaken = Date.now() - resp.timeTaken
        resp.query = req.body.query
        res.json(resp)
    })
})

app.get('/v1/autocomplete/:query', (req, res) => {
    autocomplete(req.params.query).then(resp => {
        res.json(resp)
    })
})

app.listen(9015)