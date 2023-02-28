const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

// Insert new item
router.post("/register", itemController.post_item);

// Fetch all items
router.get("/", itemController.fetch_items);

// Fetch item by id
router.get("/:id", itemController.fetch_item);

//Update item profile by ID
router.patch("/profileUpdate/:id", itemController.update_item_profile);

module.exports = router;
