const API_KEY='';
var express = require('express');
var app = express();
var zipcodes = require('zipcodes');
const request = require('request');

app.get('/',(req,res)=>{
    res.send('Hello');
})
 app.get('/weather',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(Object.keys(req.query).length===2){
        const obj2 = zipcodes.lookupByCoords(req.query.lat,req.query.long)
        let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.long}&appid=${API_KEY}&units=metric`
        request(url2, function (err, response, body) {
            const resDATA = JSON.parse(body)
            const weatherinfo = {
                weather:resDATA,
                local:obj2
            }
           err ? console.log("no weather"):res.send(weatherinfo);
    })   

    }
    else if(Object.keys(req.query).length==1){
        if(req.query.zip.length===0){
            res.send('no data')
        }
        else
        {
            const zipCode = req.query.zip;
            var obj = zipcodes.lookup(zipCode);
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${obj.latitude}&lon=${obj.longitude}&appid=${API_KEY}&units=metric`
            request(url, function (err, response, body) {
                const resDATA = JSON.parse(body)
                const weatherinfo = {
                    weather:resDATA,
                    local:obj
                }
               err ? console.log("no weather"):res.send(weatherinfo);
            
            })
    }      
    }
    else console.log("Enter a zip for weather info");
});
const port = 7000;
app.listen(port);
console.log('App is listening on port ' + port);
