const employee = require("../models/employee");
const bcrypt = require("bcryptjs");

// Add new employee to the database
const post_employee = async (req, res) => {
  const newEmployee = new employee({
    name: {
      fName:
        req.body.fName.charAt(0).toUpperCase() +
        req.body.fName.slice(1).toLowerCase(),
      lName:
        req.body.lName.charAt(0).toUpperCase() +
        req.body.lName.slice(1).toLowerCase(),
    },
    password: req.body.password,
    mobile: req.body.mobile,
    email: req.body.email,
    NIC: req.body.NIC,
    district: req.body.district,
  });

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all employees - for admin panel
const fetch_employees = async (req, res) => {
  try {
    const employees = await employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch employee by id
const fetch_employee = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const requiredEmployee = await employee.findById(id);
    res.status(200).json(requiredEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch employee based on location- other filteration purposes
const fetch_employee_based_district = async (req, res) => {
  const { district } = req.params;
  try {
    const employees = await employee.find({ district: district });

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update employee profile
const update_employee_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateEmployee = await employee.findByIdAndUpdate(id, {
      $set: {
        "name.fName": req.body.fName,
        "name.lName": req.body.lName,
        district: req.body.district,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(200).json(updateEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable employee by admin
const disable_employee = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredEmployee = await employee.findById(id);
    const ableUpdatedEmployee = await employee.findByIdAndUpdate(
      id,
      { isDisabled: !requiredEmployee.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_employee,
  fetch_employees,
  fetch_employee,
  update_employee_profile,
  disable_employee,
  fetch_employee_based_district,
};
