const sequelize = require("./db");
const User = require("../../internal/user/model");

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initializeDatabase;
