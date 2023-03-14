const order = require("../models/order");
const shop = require("../models/shop");
const consumer = require("../models/consumer");
const bcrypt = require("bcryptjs");

// Placing new order by the consumer
const post_order = async (req, res) => {
  const quantity = req.body.quantity ? req.body.quantity : 1;
  const newOrder = new order({
    shopId: req.body.shopId,
    itemId: req.body.itemId,
    price: req.body.price,
    consumerId: req.body.consumerId,
    quantity: quantity,
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

// Fetch orders based on shopId- for employee panel and shop pannel
const fetch_unhandled_orders_based_shopId = async (req, res) => {
  const { shopId } = req.params;
  try {
    const orders = await order.find({
      shopId: shopId,
      orderStatus: "order placed",
    });

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

// Fetch orders based on deliveryAgentId- for employee panel and delivery agent pannel
const fetch_orders_based_deliveryAgentId = async (req, res) => {
  const { deliveryAgentId } = req.params;
  try {
    const orders = await order.find({
      $or: [
        { shopToWarehouse: { $eq: deliveryAgentId } },
        { warehouseToShop: { $eq: deliveryAgentId } },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch freshed placed orders based on districts (not handled orders yet) - for admin pannel
const fetch_placed_orders = async (req, res) => {
  const { district } = req.params;
  try {
    // Find the shops that are located in the given district
    const shops = await shop.find({ "address.district": district });

    // Get the shop ids of the shops located in the given district
    console.log("Shops:", shops);
    const shopIds = shops.map((shop) => shop._id);

    console.log(shopIds.length);
    if (shopIds.length === 0) {
      return res.status(200).json([]);
    }

    // Find the orders that are placed and belong to the shops located in the given district
    const orders = await order.find({
      orderStatus: "Order placed",
      shopId: { $in: shopIds },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

// update order status to "order collected to the warehouse" by delivery agent after item delivered to consumers
const update_orderStatus_orderCollectedToWarehosue = async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await order.findByIdAndUpdate(id, {
      $set: {
        orderStatus: "Order collected to warehouse",
      },
    });
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetch_orders_with_different_districts = async (req, res) => {
  const { district } = req.params;
  try {
    const orders = await order
      .find({ orderStatus: "order placed" })
      .populate({
        path: "consumerId",
        select: "address.district",
      })
      .populate({
        path: "shopId",
        select: "address.district",
      })
      .exec();

    const filteredOrders = orders.filter(
      (order) =>
        order.consumerId.address.district !== district &&
        order.shopId.address.district === district
    );

    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Fetch the orders if consumer district and shop district are same for freshed orders (not handled orders)
const fetch_orders_with_same_districts = async (req, res) => {
  const { district } = req.params;
  try {
    const orders = await order
      .find({ orderStatus: "order placed" })
      .populate({
        path: "consumerId",
        select: "address.district",
      })
      .populate({
        path: "shopId",
        select: "address.district",
      })
      .exec();

    const filteredOrders = orders.filter(
      (order) =>
        order.consumerId.address.district === district &&
        order.shopId.address.district === district
    );

    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  post_order,
  fetch_orders,
  fetch_order,
  fetch_placed_orders,
  fetch_orders_with_different_districts,
  fetch_orders_with_same_districts,
  fetch_orders_based_shopId,
  fetch_unhandled_orders_based_shopId,
  fetch_orders_based_consumerId,
  fetch_orders_based_deliveryAgentId,
  update_shopToWarehouse_deliveryAgent,
  update_warehouseToShop_deliveryAgent,
  update_orderStatus_deliveredSuccessfully,
  update_orderStatus_orderCollectedToWarehosue,
};
