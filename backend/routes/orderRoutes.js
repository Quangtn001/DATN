const { Router } = require("express");
const Orders = require("../controller/OrderController");
const Authorization = require("../services/Authorization");
const ratingValidations = require("../validations/ratingValidations");
const router = Router();
router.post("/order-cod", Authorization.authorized, Orders.createOrder);
router.get("/orders", Authorization.authorized, Orders.getOrders);
router.get("/allorders", Orders.getAllOrders);
router.get("/order-details/:id", Authorization.authorized, Orders.orderDetails);
router.put("/order-update/:id", Authorization.authorized, Orders.updateOrder);
router.put(
  "/order-received/:id",
  Authorization.authorized,
  Orders.updateReceivedOrder
);
router.post(
  "/add-review",
  [Authorization.authorized, ratingValidations],
  Orders.createRating
);
module.exports = router;
