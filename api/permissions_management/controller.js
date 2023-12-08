const Permissions = require('../../models/permission');
const PermissionsAllowed = require('../../models/permissionAllowed');
const User = require('../../models/login');
const jwt = require('jsonwebtoken');
const { stripe, jwts } = require('../../config');

const {
  successMessage,
  errorMessage,
  PostData,
} = require('../../helpers/cred');
const Designation = require('../../models/designation');
exports.listPermission = async (req, res, next) => {
  try {
    let { socket } = req.app.locals;

    let data = await Permissions.findAll({});
    let datas = await PermissionsAllowed.findAll({
      where: { designationId: req.params.id },
      include: [{ model: Permissions, attributes: ['menu', 'subMenu'] }],
    });

    const mapDatas = datas.map((data) => {
      return data.permission;
    });

    res.json({
      success: true,
      msg: 'data Retrieval SuccessFul',
      data,
      datas,
    });

    socket.emit('GetPermissions', mapDatas);
  } catch (error) {
    res.json([]);
  }
};

let PermissionId;
exports.updatePermissions = async (req, res, next) => {
  let maps;
  let { socket } = req.app.locals;

  try {
    let datas;

    const body = req.body;
    if (body.length > 0) {
      const promises = body.map(async (e) => {
        const data = await Permissions.findOne({ where: { id: e } });
        return data;
      });
      const results = await Promise.all(promises);
      const AllowedPermission = results.map((e) => e.dataValues);
      const allowedPermissions = AllowedPermission.map((e) => {
        return {
          permissionId: e.id,
          designationId: req.params.id,
        };
      });
      allowedPermissions.forEach(async (e) => {
        await PermissionsAllowed.destroy({
          where: { designationId: req.params.id },
        });
      });
      datas = await PermissionsAllowed.bulkCreate(allowedPermissions);
    } else {
      datas = await PermissionsAllowed.destroy({
        where: { designationId: req.params.id },
      });
    }
    let data = await eachPermission(req.params.id);
    console.log('PermissionSocket', data);

    socket.emit('GetPermissions', data);

    res.json({ success: true, msg: 'success', datas });
  } catch (error) {}
};

exports.getProfile = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    const decoded = await jwt.verify(token, jwts.JWT_SECRET);

    let user = await User.findByPk(decoded.id);
    let data = await eachPermission(user.designationId);
    let role = await Designation.findByPk(user.designationId);

    res.json({
      success: true,
      data: { permission: data, role: role.designation },
    });
  } catch (error) {
    return await errorMessage(res, error);
  }
};

const eachPermission = async (id) => {
  let populated = await PermissionsAllowed.findAll({
    where: { designationId: id },
    include: Permissions,
  });
  let a = await populated.map((item) => {
    return { [item.permission.menu]: item.permission.subMenu };
  });
  return a;
};
