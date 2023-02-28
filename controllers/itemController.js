const item = require("../models/item");
const bcrypt = require("bcryptjs");

// Add new item to the database
const post_item = async (req, res) => {
  const newItem = new item({
    itemCode: req.body.itemCode,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    shopId: req.body.shopId,
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all items - for admin panel
const fetch_items = async (req, res) => {
  try {
    const items = await item.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch item by id
const fetch_item = async (req, res) => {
  console.log("item retrived");
  const { id } = req.params;
  console.log(id);
  try {
    const requiredItem = await item.findById(id);
    res.status(200).json(requiredItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update item profile
const update_item_profile = async (req, res) => {
  console.log("item update");
  const { id } = req.params;
  try {
    const updateItem = await item.findByIdAndUpdate(id, {
      $set: {
        price: req.body.price,
        description: req.body.description,
      },
    });
    res.status(200).json(updateItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_item,
  fetch_items,
  fetch_item,
  update_item_profile,
};
