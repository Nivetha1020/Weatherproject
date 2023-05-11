const express =  require("express");
const { connect } = require("http2");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/index.html",function(req,res){
    res.sendFile(__dirname + "/index.html");
 
});

app.post("/",function(req,res){
    

    const query = req.body.cityName;
    const apiKey = "b24921da937f89318f2c5f068cf7ea4a" ;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+""
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
           const weatherData = JSON.parse(data);
           const temp =  weatherData.main.temp;
           const weatherDescription = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const feelsLike =  weatherData.main.feels_like;
           const imageUrl =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
           res.write("<h1><em>Here is your city's Weather Report! </em></h1>")
           res.write("<style> body{ background-color : rgb(3, 80, 124);} </style>");
           res.write("<h1><em>The weather in "+ query +" is currently "+ weatherDescription+".</em></h1>");
           res.write("<img src=" +imageUrl+ ">");
           res.write("<style> img { padding-left: 600px;} </style>")
           res.write("<h1><em> The Temperature in "+ query +" is "+temp+" degree celsius</em></h1> ");
           res.write("<h1><em> It feels like "+feelsLike+" degree celsius</em></h1>");
           res.write("<style> h1 { text-align:center; color:white;} </style>")
           
           res.send();
        });
    });

});

app.listen(3000,function(){
    console.log("The Server is running on port 3000");
});