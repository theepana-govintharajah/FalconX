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
    quantity: req.body.quantity,
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
  const { id } = req.params;
  try {
    const requiredItem = await item.findById(id);
    res.status(200).json(requiredItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Filter items based on shop
const fetch_items_based_shop = async (req, res) => {
  const { shopId } = req.params;
  try {
    const items = await item.find({ shopId: shopId });

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Filter items based on category
const fetch_items_based_category = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await item.find({ category: category });

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update item profile
const update_item_profile = async (req, res) => {
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

// update item quantity
const update_item_quantity = async (req, res) => {
  const { id, orderQuantity } = req.params;
  try {
    const itemToUpdate = await item.findById(id);
    const updatedQuantity = itemToUpdate.quantity - orderQuantity;
    if (updatedQuantity < 0) {
      return res
        .status(400)
        .json({ message: "Order quantity exceeds item quantity" });
    }
    itemToUpdate.quantity = updatedQuantity;
    await itemToUpdate.save();
    if (updatedQuantity === 0) {
      await item.findByIdAndDelete(id);
    }
    res.status(200).json(itemToUpdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete item profile
const delete_item_profile = async (req, res) => {
  console.log("item deleted");
  const { id } = req.params;
  try {
    const deletedItem = await item.findByIdAndDelete(id);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_item,
  fetch_items,
  fetch_item,
  update_item_profile,
  delete_item_profile,
  fetch_items_based_shop,
  fetch_items_based_category,
  update_item_quantity,
};
