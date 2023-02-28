const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// consumer
const OrderSchema = Schema({
  shopId: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  consumerId: {
    type: Schema.Types.ObjectId,
    ref: "consumer",
  },
  orderStatus: {
    type: String,
    maxLength: [127, "Max Length is 127 characters"],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shopToWarehouse: {
    type: Schema.Types.ObjectId,
    ref: "deliveryAgent",
  },
  warehouseToShop: {
    type: Schema.Types.ObjectId,
    ref: "deliveryAgent",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
