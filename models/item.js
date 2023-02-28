const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// item
const ItemSchema = Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true,
    maxLength: [127, "Max Length is 127 characters"],
  },

  category: {
    type: String,
    required: true,
    maxLength: [127, "Max Length is 127 characters"],
  },
  price: {
    type: Number,
    required: true,
    maxLength: [127, "Max Length is 127 characters"],
  },

  description: {
    type: String,
    maxLength: [127, "Max Length is 127 characters"],
  },
  shopId: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
});

module.exports = mongoose.model("Item", ItemSchema);
