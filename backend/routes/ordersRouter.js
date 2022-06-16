const express = require("express");
const ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");

ordersRouter.get("/", ordersController.getAllOrders);
ordersRouter.post("/", ordersController.addOrder);
ordersRouter.get("/:id", ordersController.getOrder);
ordersRouter.delete("/:id", ordersController.deleteOrder);
ordersRouter.put("/:id", ordersController.editOrder);

module.exports = ordersRouter;
