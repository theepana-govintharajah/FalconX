const deliveryAgent = require("../models/deliveryAgent");
const bcrypt = require("bcryptjs");

// Add new consumer to the database
const post_delivery_agent = async (req, res) => {
  const newDeliveryAgent = new deliveryAgent({
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
    vehicleType: req.body.vehicleType,
    vehicleNumber: req.body.vehicleNumber,
    drivingLicenseNumber: req.body.drivingLicenseNumber,
    address: {
      district: req.body.district,
      city: req.body.city,
      street: req.body.street,
    },
  });

  try {
    await newDeliveryAgent.save();
    res.status(201).json(newDeliveryAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all deliveryAgents - for admin panel
const fetch_deliveryAgents = async (req, res) => {
  try {
    const delievryAgents = await deliveryAgent.find();

    res.status(200).json(delievryAgents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch delivery agents based on location - for employee panel
const fetch_deliveryAgents_based_district = async (req, res) => {
  const { district } = req.params;
  try {
    const deliveryAgents = await deliveryAgent.find({
      "address.district": district,
    });

    res.status(200).json(deliveryAgents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch delivery agents based on district and vehicle Type - for employee panel
const fetch_deliveryAgents_based_district_VehicleType = async (req, res) => {
  const { district, vehicleType } = req.params;
  try {
    const deliveryAgents = await deliveryAgent.find({
      "address.district": district,
      vehicleType: vehicleType,
    });

    res.status(200).json(deliveryAgents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch delivery agents based on city and vehicle Type - for employee panel
const fetch_deliveryAgents_based_city_VehicleType = async (req, res) => {
  const { city, vehicleType } = req.params;
  try {
    const deliveryAgents = await deliveryAgent.find({
      "address.city": city,
      vehicleType: vehicleType,
    });

    res.status(200).json(deliveryAgents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch delivery agent by id
const fetch_deliveryAgent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const requiredDeliveryAgent = await deliveryAgent.findById(id);
    res.status(200).json(requiredDeliveryAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update delivery agent profile
const update_deliveryAgent_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateDeliveryAgent = await deliveryAgent.findByIdAndUpdate(id, {
      $set: {
        "name.fName": req.body.fName,
        "name.lName": req.body.lName,
        "address.district": req.body.district,
        "address.city": req.body.city,
        "address.street": req.body.street,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(200).json(updateDeliveryAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable consumer by admin
const disable_deliveryAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredDeliveryAgent = await deliveryAgent.findById(id);
    const ableUpdatedDeliveryAgent = await deliveryAgent.findByIdAndUpdate(
      id,
      { isDisabled: !requiredDeliveryAgent.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedDeliveryAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete delivery agent profile
const delete_deliveryAgent_profile = async (req, res) => {
  console.log("item deleted");
  const { id } = req.params;
  try {
    const deletedItem = await deliveryAgent.findByIdAndDelete(id);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_delivery_agent,
  fetch_deliveryAgents,
  fetch_deliveryAgent,
  fetch_deliveryAgents_based_district,
  fetch_deliveryAgents_based_district_VehicleType,
  fetch_deliveryAgents_based_city_VehicleType,
  update_deliveryAgent_profile,
  disable_deliveryAgent,
  delete_deliveryAgent_profile,
};
