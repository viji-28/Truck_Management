const {
  errorMessage,
  successData,
  findOneData,
} = require('../../helpers/cred');
const route = require('../../models/route');

exports.Routes = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    (req.body.title = req.body.from + '-' + req.body.to),
      (req.body.longitude = req.body.locations.map((data) => data.longitude));
    req.body.latitude = req.body.locations.map((data) => data.latitude);
    console.log('req.body.location.longitude', req.body.longitude);
    const data = await route.create(req.body);
    successData(res, data);
  } catch (e) {
    errorMessage(res, e.message);
  }
};

exports.listRoute = async (req, res) => {
  try {
    const data = await route.findAll();
    successData(res, data);
  } catch (e) {
    errorMessage(res, e.message);
  }
};
