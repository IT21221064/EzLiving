const mongoose = require("mongoose");

const ccartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("CCart", ccartSchema);
