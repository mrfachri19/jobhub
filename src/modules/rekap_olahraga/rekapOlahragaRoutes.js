const express = require("express");

const Router = express.Router();
const rekapOlahragaController = require("./rekapOlahragaController");
const middlewareUpload = require("../../middleware/upload");

Router.get("/", rekapOlahragaController.getAllRekapOlahraga);
Router.post("/postrekapOlahraga", middlewareUpload, rekapOlahragaController.postRekapOlahraga);
Router.put("/updaterekapOlahraga/:id", middlewareUpload, rekapOlahragaController.updateRekapOlahraga);
Router.delete("/deleterekapOlahraga/:id", rekapOlahragaController.deleteRekapOlahraga);
Router.get("/:id", rekapOlahragaController.getRekapOlahragaById);

module.exports = Router;
