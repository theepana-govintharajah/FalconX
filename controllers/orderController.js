const order = require("../models/order");
const bcrypt = require("bcryptjs");

// Placing new order by the consumer
const post_order = async (req, res) => {
  const newOrder = new order({
    shopId: req.body.shopId,
    itemId: req.body.itemId,
    price: req.body.price,
    consumerId: req.body.consumerId,
    quantity: req.body.quantity,
    orderStatus: "Order placed",
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all orders - for admin panel
const fetch_orders = async (req, res) => {
  try {
    const orders = await order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch order by id
const fetch_order = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const requiredOrder = await order.findById(id);
    res.status(200).json(requiredOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch orders based on shopId- for employee panel and shop pannel
const fetch_orders_based_shopId = async (req, res) => {
  const { shopId } = req.params;
  try {
    const orders = await order.find({ shopId: shopId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch orders based on consumerId- for employee panel and consumer pannel
const fetch_orders_based_consumerId = async (req, res) => {
  const { consumerId } = req.params;
  try {
    const orders = await order.find({ consumerId: consumerId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Fetch not yet delivered orders based on consumerId- for admin pannel
// const fetch_delivered_orders = async (req, res) => {
//   try {
//     const orders = await order.find({
//       orderStatus: "Order placed",
//     });

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// update delivery agent by employee - From shop to warehouse
const update_shopToWarehouse_deliveryAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await order.findByIdAndUpdate(id, {
      $set: {
        shopToWarehouse: req.body.shopToWarehouse,
      },
    });
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update delivery agent by employee - From warehouse to shop
const update_warehouseToShop_deliveryAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await order.findByIdAndUpdate(id, {
      $set: {
        warehouseToShop: req.body.warehouseToShop,
      },
    });
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update order status to "delivered successfully" by delivery agent after item delivered to consumers
const update_orderStatus_deliveredSuccessfully = async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await order.findByIdAndUpdate(id, {
      $set: {
        orderStatus: "delivered successfully",
      },
    });
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_order,
  fetch_orders,
  fetch_order,
  fetch_orders_based_shopId,
  fetch_orders_based_consumerId,
  update_shopToWarehouse_deliveryAgent,
  update_warehouseToShop_deliveryAgent,
  update_orderStatus_deliveredSuccessfully,
  //   fetch_delivered_orders,
};
