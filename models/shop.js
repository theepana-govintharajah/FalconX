const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// shop
const ShopSchema = Schema({
  shopName: {
    type: String,
    required: true,
    unique: true,
    maxLength: [127, "Max Length is 127 characters"],
  },
  ownerName: {
    type: String,
    required: true,
    maxLength: [127, "Max Length is 127 characters"],
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
  businessRegistrationCertificate: {
    data: Buffer,
    contentType: String,
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
    street: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
  },
});

module.exports = mongoose.model("Shop", ShopSchema);
