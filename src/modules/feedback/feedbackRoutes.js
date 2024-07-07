const express = require("express");

const Router = express.Router();
const feedbackController = require("./feedbackController");

Router.get("/", feedbackController.getAllFeedback);
Router.post("/postfeedback", feedbackController.postFeedback);
Router.put("/updatefeedback/:id", feedbackController.updateFeedback);
Router.delete("/deletefeedback/:id", feedbackController.deleteFeedback);
Router.get("/:id", feedbackController.getFeedbackById);

module.exports = Router;
