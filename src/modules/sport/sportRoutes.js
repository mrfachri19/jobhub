const express = require("express");

const Router = express.Router();
const sportController = require("./sportController");

Router.get("/", sportController.getAllsport);
Router.post("/postsport", sportController.postsport);
Router.put("/updatesport/:id", sportController.updatesport);
Router.delete("/deleterekapjurnal/:id", sportController.deletesport);
Router.get("/:id", sportController.getsportById);

module.exports = Router;
