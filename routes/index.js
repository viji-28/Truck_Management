var express = require('express');
var router = express.Router();

router.use('/auth', require('../api/auth_management/index'));
router.use('/designations', require('../api/designations/index'));
router.use('/success', require('../api/success/index'));
router.use('/trucksList', require('../api/trucks/index'));
router.use('/trucksList', require('../api/trucks/index'));
router.use('/contactus', require('../api/contact/index'));
router.use('/adminDriver', require('../api/adminDriver/index'));

router.use('/route', require('../api/routes/index'));
var permissionRouter = require('../api/permissions_management/index');
router.use('/permission', permissionRouter);

module.exports = router;
