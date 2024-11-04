const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../../config/config");
const userRoutes = require("../../api/routes/user.routes");
const initializeDatabase = require("../../pkg/db/migrations");
const createDatabase = require("../../pkg/db/initDatabase"); // Импортируем скрипт

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes);

const startServer = async () => {
  // Создаем базу данных, если её нет
  await createDatabase();

  // Запускаем Sequelize и сервер
  await initializeDatabase();

  app.listen(config.serverPort, () => {
    console.log(`Server running on port ${config.serverPort}`);
  });
};

startServer();
