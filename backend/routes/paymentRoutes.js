const express = require("express");
const stripe = require("stripe");
const PaymentController = require("../controller/paymentController");
const Authorization = require("../services/Authorization");
const router = express.Router();

router.post(
  "/create-checkout-session",
  Authorization.authorized,
  PaymentController.paymentProcess
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.checkoutSession
);

router.get(
  "/verify-payment/:id",
  Authorization.authorized,
  PaymentController.paymentVerify
);
module.exports = router;
