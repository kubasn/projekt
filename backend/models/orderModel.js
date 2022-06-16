const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
  order: { type: Object, required: true },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
