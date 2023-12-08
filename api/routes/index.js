var express = require('express');

var router = express.Router();

const { Routes, listRoute } = require('./controller');

router.post('/', Routes);
router.get('/', listRoute);

module.exports = router;
