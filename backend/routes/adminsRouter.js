const express = require("express");
const adminsRouter = express.Router();
const adminsController = require("../controllers/adminsController");

adminsRouter.post("/register", adminsController.registerAdmin);
adminsRouter.post("/login", adminsController.LoginAdmin);
adminsRouter.get("/:id", adminsController.getAdmin);

module.exports = adminsRouter;
