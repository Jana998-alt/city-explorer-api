'use strict';
//we want to build an express server using JavaScript

const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const PORT = 3001;

// require('dotenv').config();

const weatherData = require('./data/weather.json');
// const { request, response } = require('express');



server.get('/weather',(request,response)=>{
    console.log(request.query);
    
        let cityObject = weatherData.find(cityWeather=> {if(cityWeather.lon == request.query.lon && cityWeather.lat == request.query.lat){
        return cityWeather}
        })
        
        response.status(200).send(cityObject);
    
})                                                                              

server.get('*',(req,res)=>{
    console.log('res');
    res.status(404).send('City Not Found.')
})


server.listen(PORT,()=>{
    console.log("working")
})


class Forcast {
    constructor(date,desciption){
        this.date = date;
        this.desciption = desciption;
    }
}
