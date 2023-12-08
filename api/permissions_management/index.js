var express = require('express');
var router = express.Router();
const {
  listPermission,
  updatePermissions,
  getProfile,
} = require('./controller');
router.get('/profile', getProfile);

router.get('/:id', listPermission);
router.patch('/:id', updatePermissions);

module.exports = router;
