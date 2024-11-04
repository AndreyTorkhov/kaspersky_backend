const sequelize = require("./db");
const User = require("../../internal/user/user.model");

const initializeDatabase = async () => {
  try {
    await sequelize.sync(); // Синхронизируем модель с базой данных без удаления таблиц
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initializeDatabase;
