const { faker } = require("@faker-js/faker");
const sequelize = require("./pkg/db/db");
const User = require("./internal/user/model");

const generateUsers = async () => {
  try {
    await sequelize.sync();

    const users = [];

    for (let i = 0; i < 200; i++) {
      users.push({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        status: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(["User", "Admin", "Guest"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await User.bulkCreate(users);

    console.log("200 пользователей успешно добавлены в базу данных.");
  } catch (error) {
    console.error("Ошибка при заполнении базы данных:", error);
  } finally {
    await sequelize.close();
  }
};

generateUsers();
