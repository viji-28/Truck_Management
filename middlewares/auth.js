const jwt = require('jsonwebtoken');
const users = require('../models/login');
const { stripe, jwts } = require('../config');
const { errorMessage } = require('../helpers/cred');

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith('/auth/login') ||
      req.originalUrl.startsWith('/auth/signup') ||
      req.originalUrl.startsWith('/designations') ||
      req.originalUrl.startsWith('/success')
      // req.originalUrl.startsWith('/trucksList')
    )
      return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    if (!token) {
      errorMessage(res, 'Unauthorized Access');
    }
    // console.log('token', req.header('Authorization'));
    const decoded = await jwt.verify(token, jwts.JWT_SECRET);

    if (!decoded) {
      errorMessage(res, 'Invalid Token');
    }
    // console.log(decoded);
    if (decoded.exp < Date.now()) {
      errorMessage(res, 'Token Expired');
    }

    const isUserExists = await users.findOne({ where: { id: decoded.id } });
    // console.log(isUserExists);
    if (!isUserExists) {
      errorMessage(res, 'Access Denied');
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists.id)
      .concat(isUserExists.email);

    // console.log();
    if (matchvalidity != decoded.validity) {
      errorMessage(res, 'Access Denied');
    }
    req.user = decoded;
    return next();
  } catch (ex) {
    console.log('auth catch', ex);
    // errorMessage(res, ex.message);
  }
};
