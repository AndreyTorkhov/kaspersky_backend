const { Op } = require("sequelize");
const User = require("./user.model");

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.getAllUsers = async (searchQuery) => {
  const where = {};

  if (searchQuery) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchQuery}%` } },
      { surname: { [Op.iLike]: `%${searchQuery}%` } },
    ];
  }

  return await User.findAll({ where });
};

exports.updateUser = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }
  await user.update(updatedData);
  return user;
};
