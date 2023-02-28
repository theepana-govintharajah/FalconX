const shop = require("../models/shop");
const bcrypt = require("bcryptjs");

// Add new shop to the database
const post_shop = async (req, res) => {
  const newShop = new shop({
    shopName: req.body.shopName,
    ownerName: req.body.ownerName,
    password: req.body.password,
    mobile: req.body.mobile,
    email: req.body.email,
    address: {
      district: req.body.district,
      city: req.body.city,
      street: req.body.street,
    },
  });

  try {
    await newShop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all shops - for admin panel
const fetch_shops = async (req, res) => {
  try {
    const shops = await shop.find();

    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer by id
const fetch_shop = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const requiredShop = await shop.findById(id);
    res.status(200).json(requiredShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch shopss based on location- for employee panel
const fetch_shops_based_district = async (req, res) => {
  const { district } = req.params;
  try {
    const shops = await shop.find({ "address.district": district });

    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update shop profile
const update_shop_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateShop = await shop.findByIdAndUpdate(id, {
      $set: {
        "address.district": req.body.district,
        "address.city": req.body.city,
        "address.street": req.body.street,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(200).json(updateShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable shop by admin
const disable_shop = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredShop = await shop.findById(id);
    const ableUpdatedShop = await shop.findByIdAndUpdate(
      id,
      { isDisabled: !requiredShop.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete shop profile
const delete_shop_profile = async (req, res) => {
  console.log("item deleted");
  const { id } = req.params;
  try {
    const deletedItem = await shop.findByIdAndDelete(id);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_shop,
  fetch_shops,
  fetch_shop,
  update_shop_profile,
  disable_shop,
  fetch_shops_based_district,
  delete_shop_profile,
};
