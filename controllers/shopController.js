const shop = require("../models/shop");
const bcrypt = require("bcryptjs");

const createToken = require("./createToken");

// Add new shop to the database
const post_shop = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newShop = new shop({
    shopName: req.body.shopName,
    ownerName: req.body.ownerName,
    password: hashedPassword,
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

// Login shop
const login_shop = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the consumer with the given email
    const foundShop = await shop.findOne({ email });

    // If the consumer doesn't exist, return an error
    if (!foundShop) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the given password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, foundShop.password);

    // If the passwords don't match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the passwords match, create a token and return it to the client
    const token = createToken(foundShop._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Fetch shops based on location- for employee panel
const fetch_shops_based_district = async (req, res) => {
  const { district } = req.params;
  try {
    const shops = await shop.find({ "address.district": district });

    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch unverified shops based on location- for employee panel
const fetch_unverified_shops_based_district = async (req, res) => {
  const { district } = req.params;
  try {
    const shops = await shop.find({
      "address.district": district,
      isVerified: false,
    });

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

// Verify shop profile by employee
const verify_shop_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateShop = await shop.findByIdAndUpdate(id, {
      $set: {
        isVerified: true,
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
  login_shop,
  fetch_shop,
  update_shop_profile,
  disable_shop,
  fetch_shops_based_district,
  delete_shop_profile,
  fetch_unverified_shops_based_district,
  verify_shop_profile,
};
