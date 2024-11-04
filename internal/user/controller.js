const userService = require("./service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const searchQuery = req.query.q;
    const users = await userService.getAllUsers(searchQuery);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  // Новый метод
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, surname, status, role } = req.body;
    if (
      !name ||
      !surname ||
      typeof status !== "boolean" ||
      !["User", "Admin", "Guest"].includes(role)
    ) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await userService.updateUser(userId, updatedData);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
