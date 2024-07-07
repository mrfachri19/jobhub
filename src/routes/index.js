const express = require("express");

const Router = express.Router();
const authRoutes  = require("../modules/auth/authRoutes");
const priceRoutes  = require("../modules/prices/priceRoutes");
const summaryRoutes  = require("../modules/summaries/summariesRoutes");
const rekapJurnalRoutes  = require("../modules/rekap_jurnal/rekapJurnalRoutes");
const rekapOlahragaRoutes  = require("../modules/rekap_olahraga/rekapOlahragaRoutes");
const feedbackRoutes  = require("../modules/feedback/feedbackRoutes");
const voucherRoutes  = require("../modules/voucher/voucherRoutes");
const orderRoutes  = require("../modules/order/orderRoutes");
const posterRoutes = require("../modules/poster/posterRoutes") 

Router.use("/auth", authRoutes);
Router.use("/price", priceRoutes );
Router.use("/order", orderRoutes );
Router.use("/feedback", feedbackRoutes );
Router.use("/voucher", voucherRoutes );
Router.use("/summary", summaryRoutes );
Router.use("/rekapjurnal", rekapJurnalRoutes );
Router.use("/rekapolahraga", rekapOlahragaRoutes );
Router.use("/poster", posterRoutes );

module.exports = Router;
