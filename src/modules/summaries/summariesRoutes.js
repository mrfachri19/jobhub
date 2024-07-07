const express = require("express");

const Router = express.Router();
const summaryController = require("./summariesController");

Router.get("/", summaryController.getAllSumarry);
Router.get("/:id", summaryController.getSummaryById);

module.exports = Router;
