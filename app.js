const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const appid = "b201c292fc16174b4e4ad653fbb41118";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b201c292fc16174b4e4ad653fbb41118&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;


      res.write("<h1>The current temperature of "+query+" is "+temp+" degree Celcius.</h1>");
      res.write("<h2>The current weather in "+query+" is "+weatherDescription+" .</h2>");

      res.send();
    })
  })
})

app.listen(3000, function(req, res){
  console.log("Server is running in port 3000")
})
