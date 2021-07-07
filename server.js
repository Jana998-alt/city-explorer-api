'use strict';
//we want to build an express server using JavaScript

const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const PORT = process.env.PORT;

// require('dotenv').config();

const weatherData = require('./data/weather.json');
// const { request, response } = require('express');




class Forcast {
    constructor(date,description){
        this.date = date;
        this.description = description;
    }  
}

server.get('/weather',(request,response)=>{
    
    let data = getWeatherDailyDescription(request);
    response.status(200).send(data);

    
})                                                                              


function findCity(request){
    let cityObject = weatherData.find(city=> {if(city.lon == request.query.lon && city.lat == request.query.lat){
        return city}
        })

    return cityObject
}



function getWeatherDailyDescription(request){
    let arrayOfOneCityData =[];
    let requestedCityObject = findCity(request)

    for(let j=0; j<requestedCityObject.data.length; j++){
        let cityWeatherDataForADay = new Forcast(requestedCityObject.data[j].valid_date,requestedCityObject.data[j].weather.description);
        arrayOfOneCityData.push(cityWeatherDataForADay); 
      }
      return arrayOfOneCityData;
}




server.get('/test',(req,res)=>{
    res.send('hi')
})


server.get('*',(req,res,error)=>{
    res.send(error);
})


server.listen(PORT,()=>{
    console.log("working")
})
