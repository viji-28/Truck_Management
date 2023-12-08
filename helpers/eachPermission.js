const Permission = require('../models/permission');
const PermissionAllowed = require('../models/permissionAllowed');

exports.eachPermission = async (id) => {
  //   let populated = await PermissionAllowed.findAll({
  //     where: { designationId: id },
  //     include: Permission,
  //   });
  // console.log('popu', JSON.stringify(populated, null, 2));
  //   let a = await populated.map((item) => {
  //     return { [item.permission.menu]: item.permission.subMenu };
  //   });
  //   return a;
};
