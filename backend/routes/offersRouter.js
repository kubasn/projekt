const express = require("express");
const offersRouter = express.Router();
const offersController = require("../controllers/offersController");

offersRouter.get("/", offersController.getAllOffers);
offersRouter.post("/", offersController.addOffer);
offersRouter.delete("/:id", offersController.deleteOffer);
offersRouter.put("/:id", offersController.editOffer);
offersRouter.get("/:id", offersController.getOffer);
module.exports = offersRouter;
