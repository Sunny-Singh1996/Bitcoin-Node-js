var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(express.static('views'));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});


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

app.listen(8080, function () {
    console.log("server start at 8080");
});