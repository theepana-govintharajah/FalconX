const express = require("express");
const router = express.Router();

const consumerController = require("../controllers/consumerController");

// Register new consumer
router.post("/register", consumerController.post_consumer);

// Login consumer
router.post("/login", consumerController.login_consumer);

// Fetch all consumers
router.get("/", consumerController.fetch_consumers);

// Fetch consumer by id
router.get("/:id", consumerController.fetch_consumer);

// Fetch consumer by district
router.get(
  "/district/:district",
  consumerController.fetch_consumers_based_district
);

//Update consumers profile by ID
router.patch("/profileUpdate/:id", consumerController.update_consumer_profile);

// Disable or Enable consumer
router.patch("/able/:id", consumerController.disable_consumer);

module.exports = router;
