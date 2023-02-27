const express = require("express");
const router = express.Router();

const deliveryAgentController = require("../controllers/deliveryAgentController");

// Register new delivery agent
router.post("/register", deliveryAgentController.post_delivery_agent);

// Fetch all delivery agents
router.get("/", deliveryAgentController.fetch_deliveryAgents);

// Fetch delivery agent by id
router.get("/:id", deliveryAgentController.fetch_deliveryAgent);

// Fetch consumer by district
router.get(
  "/district/:district",
  deliveryAgentController.fetch_deliveryAgents_based_district
);

//Update delivery agent profile by ID
router.patch(
  "/profileUpdate/:id",
  deliveryAgentController.update_deliveryAgent_profile
);

// Disable or Enable delivery agent
router.patch("/able/:id", deliveryAgentController.disable_deliveryAgent);

module.exports = router;
