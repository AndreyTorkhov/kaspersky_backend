const { Client } = require("pg");
const config = require("../../config/config");

const createDatabase = async () => {
  // Подключаемся к PostgreSQL без указания конкретной базы данных
  const client = new Client({
    user: config.db.user,
    host: config.db.host,
    password: config.db.password,
    port: config.db.port, // Подключаемся через порт базы данных
  });

  try {
    await client.connect();

    // Проверяем, существует ли база данных
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.db.name}'`
    );
    if (res.rowCount === 0) {
      // Если базы данных нет, создаём её
      await client.query(`CREATE DATABASE ${config.db.name}`);
      console.log(`Database "${config.db.name}" created successfully.`);
    } else {
      console.log(`Database "${config.db.name}" already exists.`);
    }
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.log(
        "Database connection was refused. Ensure PostgreSQL is running and check connection settings."
      );
    } else {
      console.error("Error creating database:", error);
    }
  } finally {
    await client.end();
  }
};

module.exports = createDatabase;
