const {
  errorMessage,
  successData,
  findOneData,
} = require('../../helpers/cred');
const Brand = require('../../models/Brand');
const Variant = require('../../models/Variant');
const Truck = require('../../models/Truck');
const TruckModel = require('../../models/truckDatabase');
const TrucksData = require('../../models/truckDatabase');
const { jwts } = require('../../config');
const jwt = require('jsonwebtoken');
const Login = require('../../models/login');

exports.Brands = async (req, res, next) => {
  try {
    let brand = await Brand.findAll();
    let variant = await Variant.findAll();
    let truck = await Truck.findAll();
    successData(res, { brand, variant, truck });
  } catch (e) {
    errorMessage(res, e.message);
  }
};

exports.BrandsData = async (req, res, next) => {
  try {
    console.log('first', req.body.brand);
    let brand = await Brand.findAll({ where: { name: req.body.brand } });
    let truck = await Truck.findAll({ where: { bId: brand[0].bId } });
    let variant = await Variant.findAll({ where: { mId: truck[0].mId } });
    console.log('variant', variant);
    successData(res, { brand, variant, truck });
  } catch (e) {
    errorMessage(res, e.message);
  }
};

exports.Trucks = async (req, res, next) => {
  let pathMap;
  try {
    req.body.rcPhoto = req.files[0].path.replace(/^public/, '');
    FirstElement = req.files.shift();
    req.files.map((data) => data.path);
    req.body.truckPhoto = JSON.stringify(
      req.files.map((data) => data.path.replace(/^public/, ''))
    );
    // const token = req.header('Authorization');
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    const decoded = await jwt.verify(token, jwts.JWT_SECRET);
    const decodedemail = decoded.email;
    const loginData = await Login.findAll({ where: { email: decodedemail } });
    console.log('loginData', loginData[0].id);
    req.body.createdBy = loginData[0].id;
    console.log('req.body', req.body);
    const data = await TruckModel.create(req.body);
    successData(res, data);
  } catch (e) {
    errorMessage(res, e.message);
  }
};

exports.Listing = async (req, res) => {
  try {
    const truckDatabaseData = await TrucksData.findAll();
    console.log('truckDatabaseData', truckDatabaseData);
    successData(res, truckDatabaseData);
  } catch (e) {
    errorMessage(res, e.message);
  }
};
