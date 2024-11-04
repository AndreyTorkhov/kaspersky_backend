const User = require("./user.model");

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.getAllUsers = async () => {
  return await User.findAll();
};
