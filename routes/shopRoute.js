const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// Register new shop
router.post("/register", shopController.post_shop);

// Login shop
router.post("/login", shopController.login_shop);

// Fetch all shops
router.get("/", shopController.fetch_shops);

// Fetch shop by id
router.get("/:id", shopController.fetch_shop);

// Fetch shops by district
router.get("/district/:district", shopController.fetch_shops_based_district);

// Fetch unverified shops by district
router.get(
  "/unverified/:district",
  shopController.fetch_unverified_shops_based_district
);

//Update shop profile by ID
router.patch("/profileUpdate/:id", shopController.update_shop_profile);

//Verify shop profile by ID
router.patch("/verify/:id", shopController.verify_shop_profile);

// Disable or Enable consumer
router.patch("/able/:id", shopController.disable_shop);

//Delete item profile by ID
router.delete("/profileDelete/:id", shopController.delete_shop_profile);

module.exports = router;
