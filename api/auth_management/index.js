var express = require('express');
var router = express.Router();

const {
  login,
  getProfile,
  Signup,
  makeStripePayment,
  makePayment,
} = require('./controller');

router.post('/login', login);
router.get('/profile', getProfile);
router.post('/signup', Signup);
router.post('/stripe', makePayment);

module.exports = router;
