const express = require("express");

const Router = express.Router();
const middlewareUpload = require("../../middleware/upload");
const PosterController = require("./posterController");

Router.get("/", PosterController.getAllPoster);
Router.get("/:id", PosterController.getPosterById);
Router.post("/post_poster", middlewareUpload, PosterController.postPoster);
Router.delete("/delete_poster/:id", PosterController.deletePoster);

module.exports = Router;
