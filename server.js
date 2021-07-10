'use strict';

//we want to build an express server using JavaScript

const express = require('express'); //to import 'express' library (already installed it)
const server = express(); //to use the properties & methods of express, I give them here to "server".

const cors = require('cors'); //gives the permitions for request to the chosen clients
server.use(cors());

const axios = require('axios');

require('dotenv').config();



const weatherServer = require('./modules/weather');
const getMovies = require('./modules/movies');


server.get('/weather',weatherServer);


server.get('/movies',getMovies);


server.get('*',(req,res,error)=>{
    res.send(error);
})


server.listen(process.env.PORT,()=>{
    console.log("server listener is running")
})
