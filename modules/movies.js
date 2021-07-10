const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const axios = require('axios');

require('dotenv').config();

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

function getMovies(req,res){
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${encodeURI(req.query.query)}`

    let moviesDataArray = [];
    axios.get(url).then(moviesData =>{
        moviesData.data.results.map((movie)=>{
            let dataFromMovie = new Movies(movie.title,movie.release_date,movie.poster_path,movie.overview,movie.vote_count,movie.vote_average,movie.vote_average,movie.popularity);
            moviesDataArray.push(dataFromMovie);
        })
        res.send(moviesDataArray);
    })

    
}

module.exports = getMovies;