const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username:{
    type:String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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

cartSchema.statics.clearCart = function (callback) {
  // You can use this method to delete all documents in the Cart collection
  this.deleteMany({}, callback);
};

module.exports = mongoose.model("Cart", cartSchema);