const express = require('express');
const router = express.Router();
require('dotenv').config();

// example route
router.get('/user', async function (req, res) {
  // let usrNumber = await oF.getCount();
  res.status(200).json({ message: 'all good under the hood' });
});

module.exports = router;
