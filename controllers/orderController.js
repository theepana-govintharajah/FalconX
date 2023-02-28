const order = require("../models/order");
const bcrypt = require("bcryptjs");

// Placing new order by the consumer
const post_order = async (req, res) => {
  const newOrder = new order({
    shopId: req.body.shopId,
    itemId: req.body.itemId,
    price: req.body.price,
    consumerId: req.body.consumerId,
    orderStatus: "Order placed",
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_order,
};
