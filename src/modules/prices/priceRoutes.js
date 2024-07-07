const express = require("express");

const Router = express.Router();
const PriceController = require("./priceController");
const middlewareUpload = require("../../middleware/upload");

Router.get("/", PriceController.getAllPrices);
Router.get("/:id", PriceController.getPriceById);
Router.post("/post_price", PriceController.postPrices);
Router.put("/update_price/:id", middlewareUpload, PriceController.updatePrices);
Router.delete("/delete_price/:id", PriceController.deletePrice);

module.exports = Router;
