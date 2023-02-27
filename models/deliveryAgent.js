const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Delivery Agent
const DeliveryAgentSchema = Schema({
  name: {
    fName: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxLength: [10, "Max Length is 10 characters"],
    minLength: [10, "Min Length is 10 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: [127, "Max Length is 127 characters"],
  },
  vehicleType: {
    type: String,
    required: true,
    unique: true,
    maxLength: [127, "Max Length is 127 characters"],
  },
  vehicleNumber: {
    type: String,
    unique: true,
    required: true,
    minLength: [7, "Min Length is 10 characters"],
    maxLength: [7, "Max Length is 15 characters"],
  },
  drivingLicenseNumber: {
    type: String,
    unique: true,
    required: true,
    minLength: [10, "Min Length is 10 characters"],
    maxLength: [15, "Max Length is 15 characters"],
  },
  NIC: {
    type: String,
    unique: true,
    required: true,
    minLength: [10, "Min Length is 10 characters"],
    maxLength: [15, "Max Length is 15 characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Min Length is 8 characters"],
    maxLength: [100, "Max Length is 100 characters"],
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  address: {
    district: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
    city: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
  },
});

module.exports = mongoose.model("DeliveryAgent", DeliveryAgentSchema);
