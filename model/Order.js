const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide a user id."],
  },
  orderId: {
    type: String,
    required: [true, "Please provide an order id."],
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Please provide a product id."],
  },
  sku: {
    type: String,
    required: [true, "Please provide a sku."],
  },
  associatedOrderId: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "please provide a price."],
  },
  currency: {
    type: String,
    enum: ["USD", "EURO", "POUND"],
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
