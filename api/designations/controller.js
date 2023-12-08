const { errorMessage, successData } = require('../../helpers/cred');
const Designation = require('../../models/designation');
const PermissionsAllowed = require('../../models/permissionAllowed');

exports.Designation = async (req, res, next) => {
  try {
    let designation = await Designation.findAll();
    successData(res, designation);
  } catch (e) {
    errorMessage(res, e.message);
  }
};

let design;
let hi;
exports.getById = async (req, res) => {
  try {
    console.log('req.params.id', req.params.id);
    if (req.params.id) {
      design = await PermissionsAllowed.findAll({
        where: {
          designationId: req.params.id,
        },
        attributes: ['permissionId'],
      });
      hi = design.map((data) => {
        return data.permissionId;
      });
      console.log('design', hi);
    } else {
      design = await Designation.findOne({ where: {} });
    }
    res.json(hi);
  } catch (e) {
    res.json([]);
  }
};
