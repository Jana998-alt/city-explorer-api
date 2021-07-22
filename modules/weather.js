const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const axios = require('axios');

require('dotenv').config();

let inMemory = {};


class Forcast {
    constructor(date, description, maxTemp, minTemp, cityName) {
        this.cityName = cityName;
        this.date = date;
        this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    }
}


function weatherServer(request, response) {

    let sQuery = `${request.query.lon} ${request.query.lat}` ;


    let weatherDataFromAPI;
    let requestedDataLink = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lon=${request.query.lon}&lat=${request.query.lat}`;

    if (inMemory[sQuery] !== undefined) {
        console.log('in Memory is defined');
        console.log(sQuery);
        response.send(inMemory[sQuery]);
    }

    else {
        console.log('is memory is undefined');
        console.log(sQuery);

        axios.get(requestedDataLink).then(weatherDataFromAPI => {

            let arrayOfOneCityData = [];

            weatherDataFromAPI.data.data.map((dayWeather) => {

                let WeatherDataForADay = new Forcast(dayWeather.valid_date, dayWeather.weather.description, dayWeather.max_temp, dayWeather.low_temp, request.query.city);

                arrayOfOneCityData.push(WeatherDataForADay);
            })

            inMemory[sQuery] = arrayOfOneCityData;  //bracket notation to make a new property for an object
            response.status(200).send(arrayOfOneCityData);
        });
    }



}


module.exports = weatherServer;