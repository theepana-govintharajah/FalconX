const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Place new order
router.post("/register", orderController.post_order);

module.exports = router;
