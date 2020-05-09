const environmentVars = require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const uploadApi = require('./api/routes/dataUpload');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ parameterLimit: 100000, limit: '5mb', extended: true }));

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// CORS // prevent those errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // to restrict it later second argument: 'https://blabla'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // the browser makes a request first to check if he can make the request
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// =========================== ROUTERS ================================ //

app.get('/', function (req, res) {
  res.render('index', {});
});

app.use('/v1/upload', uploadApi);

// anything that gets passed the routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // this passes if any other error happens in the application
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
