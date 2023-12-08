var express = require('express');
var router = express.Router();

const { Designation, getById } = require('./controller');

router.get('/', Designation);
router.get('/:id', getById);

module.exports = router;
