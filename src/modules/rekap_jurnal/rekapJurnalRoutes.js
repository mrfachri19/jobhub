const express = require("express");

const Router = express.Router();
const rekapJurnalController = require("./rekapJurnalController");

Router.get("/", rekapJurnalController.getAllRekapJurnal);
Router.post("/postrekapjurnal", rekapJurnalController.postRekapJurnal);
Router.put("/updaterekapjurnal/:id", rekapJurnalController.updateRekapJurnal);
Router.delete("/deleterekapjurnal/:id", rekapJurnalController.deleteRekapJurnal);
Router.get("/:id", rekapJurnalController.getRekapJurnalById);

module.exports = Router;
