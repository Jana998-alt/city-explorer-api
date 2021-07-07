'use strict';

//we want to build an express server using JavaScript

const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const PORT = 3001;

const axios = require('axios');

require('dotenv').config();


class Forcast {
    constructor(date,description){
        this.date = date;
        this.description = description;
    }  
}

server.get('/weather',(request,response)=>{

    let weatherDataFromAPI;
    let requestedDataLink = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lon=${request.query.lon}&lat=${request.query.lat}`;


    axios.get(requestedDataLink).then(weatherDataFromAPI => {

        let arrayOfOneCityData =[];
        console.log('weatherDataFromAPI.data.data');
        weatherDataFromAPI.data.data.map((dayWeather)=>{
                let WeatherDataForADay = new Forcast(dayWeather.datetime,dayWeather.weather.description);
                arrayOfOneCityData.push(WeatherDataForADay);
            })

       console.log(arrayOfOneCityData);
        response.status(200).send(arrayOfOneCityData);
    });

})                                                                              




server.get('/test',(req,res)=>{
    res.send('hi')
})


server.get('*',(req,res,error)=>{
    res.send(error);
})


server.listen(PORT,()=>{
    console.log("working")
})
