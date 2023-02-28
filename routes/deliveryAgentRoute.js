const express = require("express");
const router = express.Router();

const deliveryAgentController = require("../controllers/deliveryAgentController");

// Register new delivery agent
router.post("/register", deliveryAgentController.post_delivery_agent);

// Login delivery agent
router.post("/login", deliveryAgentController.login_deliveryAgent);

// Fetch all delivery agents
router.get("/", deliveryAgentController.fetch_deliveryAgents);

// Fetch delivery agent by id
router.get("/:id", deliveryAgentController.fetch_deliveryAgent);

// Fetch delivery agent by district
router.get(
  "/district/:district",
  deliveryAgentController.fetch_deliveryAgents_based_district
);

// Fetch delivery agent by district and vehicle type
router.get(
  "/district/vehicleType/:district/:vehicleType",
  deliveryAgentController.fetch_deliveryAgents_based_district_VehicleType
);

// Fetch consumer by city and vehicle type
router.get(
  "/city/vehicleType/:city/:vehicleType",
  deliveryAgentController.fetch_deliveryAgents_based_city_VehicleType
);

//Update delivery agent profile by ID
router.patch(
  "/profileUpdate/:id",
  deliveryAgentController.update_deliveryAgent_profile
);

// Disable or Enable delivery agent
router.patch("/able/:id", deliveryAgentController.disable_deliveryAgent);

//Delete item profile by ID
router.delete(
  "/profileDelete/:id",
  deliveryAgentController.delete_deliveryAgent_profile
);

module.exports = router;
