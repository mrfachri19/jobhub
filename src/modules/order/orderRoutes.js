const express = require("express");

const Router = express.Router();
const orderController = require("./orderController");
const middlewareUpload = require("../../middleware/upload");

Router.get("/", orderController.getAllorder);
Router.post("/post_order",middlewareUpload, orderController.postorder);
Router.put("/updatesport/:id", orderController.updateorder);
Router.delete("/deleterekapjurnal/:id", orderController.deleteorder);
Router.get("/:id", orderController.getorderById);

module.exports = Router;
