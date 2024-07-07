const express = require("express");

const Router = express.Router();
const voucherController = require("./voucherController");

Router.get("/", voucherController.getAllvoucher);
Router.post("/post_voucher", voucherController.postvoucher);
Router.put("/update_voucher/:id", voucherController.updatevoucher);
Router.delete("/delete_voucher/:id", voucherController.deletevoucher);
Router.get("/:id",  voucherController.getvoucherById);

module.exports = Router;
