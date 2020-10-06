const express = require('express');
const router = express.Router();
require('dotenv').config();
const os = require('os');
const cpuCount = os.cpus().length;

const OF = require('./otherFunctions');
const oF = new OF();

// usercountapi
router.get('/newuser', async function (req, res) {
  let usrNumber = await oF.increaseCount();
  let string = calculateTons(usrNumber);
  res.status(200).json({ C02SAVED: string });
});

router.get('/newuser', async function (req, res) {
  let usrNumber = await oF.getCount();
  let string = calculateTons(usrNumber);
  res.status(200).json({ C02SAVED: string });
});

function calculateTons(count) {
  let co2 = count * 14.61;
  let string = `${co2} tons`;
  return string;
}

router.post('/upload', async (req, res, next) => {
  let err = false;

  // check if correct data sent
  if (!req.body.imgData) {
    const error = new Error('no image data passed');
    error.status = 400;
    next(error);
    return;
  }

  // console.log('sending result');
  if (err) {
    res.status(503).send('Service unavailable. Please retry.');
  } else {
    res.status(200).json({ message: 'Created images', imgData: result });
  }
});

module.exports = router;
