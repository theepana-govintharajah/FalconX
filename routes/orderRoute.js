const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Place new order
router.post("/register", orderController.post_order);

// Fetch all orders
router.get("/", orderController.fetch_orders);

// Fetch order by id
router.get("/:id", orderController.fetch_order);

// Fetch orders by shopId
router.get("/shopId/:shopId", orderController.fetch_orders_based_shopId);

// Fetch orders by consumerId
router.get(
  "/consumerId/:consumerId",
  orderController.fetch_orders_based_consumerId
);

// // Fetch delivered orders by admin
// router.get("/delivered", orderController.fetch_delivered_orders);

module.exports = router;
