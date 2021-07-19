const express = require('express');
const router = express.Router();
require('dotenv').config();
const fs = require('fs');
const util = require('util');

const OF = require('./otherFunctions');
const oF = new OF();

const environmentVars = require('dotenv').config();

router.post('/tetAPI', async function (req, res) {
  console.log('got speech');
  console.log(req.body);

  let result = {
    test: "api worked"
  }
  res.status(200).json(result);
});

// router.get('/newuser', async function (req, res) {
//   let usrNumber = await oF.increaseCount();
//   let string = calculateTons(usrNumber);
//   res.status(200).json({ C02SAVED: string });
// });

// router.get('/currentc02', async function (req, res) {
//   let usrNumber = await oF.getCount();
//   let string = calculateTons(usrNumber);
//   res.status(200).json({ C02SAVED: string });
// });

// router.post('/upload', async (req, res, next) => {
//   let err = false;

//   // check if correct data sent
//   if (!req.body.imgData) {
//     const error = new Error('no image data passed');
//     error.status = 400;
//     next(error);
//     return;
//   }

//   // console.log('sending result');
//   if (err) {
//     res.status(503).send('Service unavailable. Please retry.');
//   } else {
//     res.status(200).json({ message: 'Created images', imgData: result });
//   }
// });

module.exports = router;
