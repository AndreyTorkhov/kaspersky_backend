const User = require("./user.model");

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.updateUser = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }
  await user.update(updatedData);
  return user;
};
