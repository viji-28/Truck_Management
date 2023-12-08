const User = require('../models/login');

exports.passwordHash = async (pass) => {
  const salt = await User.generateSalt();
  let password = await User.hashPassword(pass, salt);
  return { salt, password };
};
