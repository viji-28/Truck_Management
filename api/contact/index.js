var express = require('express');
var router = express.Router();

const { postContact } = require('./controller');

router.post('/', postContact);

module.exports = router;
