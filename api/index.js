const express = require('express')
const app = express()

const { search, autocomplete } = require("./search")

app.get('/', (req, res) => {
  res.redirect('https://search.dothq.co')
})

app.post('/v1/search/:query/:options?', (req, res) => {
    search(req.params.query, req.params.options ? JSON.parse(decodeURIComponent(req.params.options)) : "").then(resp => {
        resp.timeTaken = Date.now() - resp.timeTaken
        res.json(resp)
    })
})

app.get('/v1/autocomplete/:query', (req, res) => {
    autocomplete(req.params.query).then(resp => {
        res.json(resp)
    })
})

app.listen(9015)