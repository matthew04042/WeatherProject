const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  var place = req.body.place
  const url = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
  https.get(url, function(response){
     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.temperature.data[place].value;
       const icon = weatherData.icon
       var iconUrl = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+icon+".png";
       res.write("<h1>The weather now is " + String(temp)+" C</h1>");
       res.write("<img src='" + iconUrl + "'>");
       res.send();
     });
  });
  console.log("Recieve");
})
app.listen(3000, function(){
  console.log("Server Start")
});
