'use strict'

//  ralph live notebook
//  Created by Vinzenz Aubry
//	Contact: v@vinzenzaubry.com

const express = require('express');
const bodyParser = require('body-parser'); // const path = require('path');
const environmentVars = require('dotenv').config();

// Brute Force Limiter
// const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 1337;
const serverAdress = process.env.SERVERIP || "127.0.0.1";
const server = require('http').createServer(app);

// for api
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Process application/json
app.use(bodyParser.json());

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// =========================== ROUTERS ================================ //

app.get('/', function (req, res) {
    // res.render('index', {}); //would render ejs
    res.send('Hello World, from Ralphs Notebook: /v1/ralph');
});

// app.use('/', function (req, res, next) {
//     next(); // console.log(`Request Url: ${req.url}`);
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Brute Force Limiter
// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100
// });

// only apply to requests that begin with /api/
// app.use("/", apiLimiter);

app.get('/v1/ralph', function (req, res) {
    var data = {
        "country": "test",
        "language": "test",
        "lat": "test",
        "lon": "test",
    };

    res.send(data);
});



// =========================== START SERVER ================================ //

server.listen(port, serverAdress, function () { //http listen, to make socket work
    // app.address = "127.0.0.1";
    console.log('Server started on ' + serverAdress + ' port:' + port)
});