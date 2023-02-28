const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

// Register new employee
router.post("/register", employeeController.post_employee);

// Login employee
router.post("/login", employeeController.login_employee);

// Fetch all employees
router.get("/", employeeController.fetch_employees);

// Fetch employee by id
router.get("/:id", employeeController.fetch_employee);

// Fetch employee by district
router.get(
  "/district/:district",
  employeeController.fetch_employee_based_district
);

//Update employees profile by ID
router.patch("/profileUpdate/:id", employeeController.update_employee_profile);

// Disable or Enable consumer
router.patch("/able/:id", employeeController.disable_employee);

module.exports = router;
