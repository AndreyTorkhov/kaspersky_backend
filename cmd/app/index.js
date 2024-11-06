const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../../config/config");
const userRoutes = require("../../api/routes/routes");
const initializeDatabase = require("../../pkg/db/migrations");
const createDatabase = require("../../pkg/db/initDatabase");
const errorHandler = require("../../middleware/errorHandler");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(errorHandler);

app.use("/api", userRoutes);

const startServer = async () => {
  await createDatabase();

  await initializeDatabase();

  app.listen(config.serverPort, () => {
    console.log(`Server running on port ${config.serverPort}`);
  });
};

startServer();
