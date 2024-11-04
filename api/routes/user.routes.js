const express = require("express");
const router = express.Router();
const userController = require("../../internal/user/user.controller");

router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);

module.exports = router;
