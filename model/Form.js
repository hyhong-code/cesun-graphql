const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject cannot be empty."],
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty."],
  },
  images: {
    type: [
      {
        type: String,
      },
    ],
  },
  amazonOrderId: {
    type: String,
  },
});

module.exports = mongoose.model("Form", formSchema);
