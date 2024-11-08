const { Op } = require("sequelize");
const User = require("./model");

exports.getAllUsers = async ({ searchQuery, offset, limit }) => {
  const where = {};

  if (searchQuery) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchQuery}%` } },
      { surname: { [Op.iLike]: `%${searchQuery}%` } },
    ];
  }

  return await User.findAll({ where, offset, limit });
};

exports.countUsers = async (searchQuery) => {
  const where = {};

  if (searchQuery) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchQuery}%` } },
      { surname: { [Op.iLike]: `%${searchQuery}%` } },
    ];
  }

  return await User.count({ where });
};

exports.getUserById = async (userId) => {
  return await User.findByPk(userId);
};

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.updateUser = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }
  await user.update(updatedData);
  return user;
};
