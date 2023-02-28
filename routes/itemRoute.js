const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

// Insert new item
router.post("/register", itemController.post_item);

// Fetch all items
router.get("/", itemController.fetch_items);

// Fetch item by id
router.get("/:id", itemController.fetch_item);

// Fetch item based on shop
router.get("/shop/:shopId", itemController.fetch_items_based_shop);

// Fetch item based on category
router.get("/category/:category", itemController.fetch_items_based_category);

//Update item profile by ID
router.patch("/profileUpdate/:id", itemController.update_item_profile);

//Update item quantity profile by ID
router.patch(
  "/quantityUpdate/:id/orderQuantity",
  itemController.update_item_quantity
);

//Delete item profile by ID
router.delete("/profileDelete/:id", itemController.delete_item_profile);

module.exports = router;
