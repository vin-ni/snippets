'use strict';

const express = require('express'); // const bodyParser = require('body-parser'); // const path = require('path');
const fs = require('fs');

const environmentVars = require('dotenv').config();

const app = express();
const port = process.env.PORT || 1337;
const ip = process.env.IP || '127.0.0.1';
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use('/assets', express.static(__dirname + '/public'));
app.use('/session/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// =========================== ROUTERS ================================ //

app.get('/', function (req, res) {
  res.render('index', {});
});

app.use('/', function (req, res, next) {
  next(); // console.log(`Request Url: ${req.url}`);
});

// =========================== SOCKET.IO ================================ //

io.on('connection', function (client) {
  client.on('join', function (data) {
    client.emit('messages', 'Socket Connected to Server');
  });

  client.on('messages', function (data) {
    client.emit('broad', data);
  });
});

// =========================== START SERVER ================================ //

server.listen(port, ip, function () {
  //http listen, to make socket work
  // app.address = "127.0.0.1";
  console.log(`Server started at ${ip} port: ${port}`);
});
