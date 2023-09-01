const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // You can set a default quantity if needed
  },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
