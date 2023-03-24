const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {  
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.country}&appid=6bda3858adacb6307e77fb99e5618246&units=metric`
    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on('data', function(d) {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            res.write(`<p>It is ${description} in ${weatherData.name}</p>`)
            res.write(`<h1>The temprature in ${weatherData.name} is ${temp}°</h1>`)
            res.send();
        })
    })
  })


app.listen("3000", function (req, res) {  
    console.log("server started on port 3000! 🥳");
})