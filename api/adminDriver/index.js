var express = require('express');
const {
  imageUpload,
  multipleFileUpload,
} = require('../../middlewares/imageUploader');
var router = express.Router();

const { getAlldriver, driverSignup } = require('./controller');

router.post(
  '/create',
  imageUpload.fields([
    { name: 'licensePhoto', maxCount: 1 },
    { name: 'userPhoto', maxCount: 1 },
  ]),

  driverSignup
);
router.get('/list', getAlldriver);
router.get('/truckAdmin', getAlldriver);
router.get('/routeAdmin', getAlldriver);

module.exports = router;
