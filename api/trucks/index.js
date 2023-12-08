var express = require('express');
const {
  imageUpload,
  multipleFileUpload,
} = require('../../middlewares/imageUploader');
var router = express.Router();

const { Brands, BrandsData, Trucks, Listing } = require('./controller');

router.get('/', Brands);
router.post('/', BrandsData);
router.get('/list', Listing);
router.post('/trucks', multipleFileUpload.array('truckPhotos'), Trucks);

module.exports = router;
