const mongoose = require("mongoose");
const router = require("../routes/reviewRoutes");

const reviewSchema = new mongoose.Schema(
  {
    reviewtitle: {
      type: String,
      required: true,
    },
    reviewtext: {
      type: String,
      required: true,
    },
    reviewimage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Review", reviewSchema);