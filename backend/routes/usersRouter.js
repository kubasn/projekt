const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/usersController");

usersRouter.post("/register", usersController.registerUser);
usersRouter.get("/", usersController.getUsers);
usersRouter.post("/login", usersController.LoginUser);
usersRouter.get("/:id", usersController.getUser);
usersRouter.put("/:id", usersController.editUser);

module.exports = usersRouter;
