const express = require("express");

const Router = express.Router();
const meditationController = require("./meditationController");
const middlewareUpload = require("../../middleware/upload");

Router.get("/", meditationController.getAllMeditation);
Router.post("/postmeditation", middlewareUpload, meditationController.postMeditation);
Router.put("/updatesport/:id", middlewareUpload, meditationController.updatemeditation);
Router.delete("/deleterekapjurnal/:id", meditationController.deleteMeditation);
Router.get("/:id",  meditationController.getMeditationById);

module.exports = Router;
