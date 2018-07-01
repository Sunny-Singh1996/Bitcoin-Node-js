require('dotenv').config()
let express = require("express"),
    app = express(),
    PORT = process.env.PORT || 3000,
    path = require('path'),
    bodyparser = require('body-parser'),
    request = require('request')


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
})


app.get("/api", function (req, res) {

    var currency = req.query.search;

    request({
        url: "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json",
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
            let usd = body.bpi.USD,
                currentCurrency = body.bpi[currency]
            res.json({
                USD: usd,
                currentCurrency: currentCurrency
            })
        }
    })
});


app.listen(PORT, err => {
    if (err) return console.log(err)
    console.log(`server running at ${PORT}`)
})
