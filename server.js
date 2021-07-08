'use strict';

//we want to build an express server using JavaScript

const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const axios = require('axios');

require('dotenv').config();


class Forcast {
    constructor(date,description,maxTemp,minTemp,cityName){
        this.cityName = cityName;
        this.date = date;
        this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    }  
}



server.get('/weather',(request,response)=>{

    let weatherDataFromAPI;
    let requestedDataLink = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lon=${request.query.lon}&lat=${request.query.lat}`;


    axios.get(requestedDataLink).then(weatherDataFromAPI => {

        let arrayOfOneCityData =[];
        console.log('weatherDataFromAPI.data.data');
        weatherDataFromAPI.data.data.map((dayWeather)=>{
                let WeatherDataForADay = new Forcast(dayWeather.datetime,dayWeather.weather.description,dayWeather.max_temp,dayWeather.low_temp,request.query.city);
                arrayOfOneCityData.push(WeatherDataForADay);
            })

       console.log(arrayOfOneCityData);
        response.status(200).send(arrayOfOneCityData);
    });

})                                                                              


class Movies {
    constructor(movieName,releaseDate,imageURL,overview,totalVotes,avgVotes,popularity){
        this.movieName = movieName;
        this.releaseDate = releaseDate;
        this.imageURL = `https://image.tmdb.org/t/p/w500${imageURL}`;
        this.overview = overview;
        this.totalVotes = totalVotes;
        this.avgVotes = avgVotes;
        this.popularity = popularity;
    }
}

server.get('/movies', (req,res)=>{
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${encodeURI(req.query.query)}`

    let moviesDataArray = [];
    axios.get(url).then(moviesData =>{
        console.log(moviesData.data.results);
        moviesData.data.results.map((movie)=>{
            let dataFromMovie = new Movies(movie.title,movie.release_date,movie.poster_path,movie.overview,movie.vote_count,movie.vote_average,movie.vote_average,movie.popularity);
            moviesDataArray.push(dataFromMovie);
        })
        res.send(moviesDataArray);
    })

    
})



server.get('/test',(req,res)=>{
    res.send('hi')
})


server.get('*',(req,res,error)=>{
    res.send(error);
})


server.listen(process.env.PORT,()=>{
    console.log("working")
})
