const mongoose = require("mongoose");
const router = require("../routes/feedbackRoutes");

const feedbackSchema = new mongoose.Schema(
  {
    feedbacktitle: {
      type: String,
      required: true,
    },
    feedbacktext: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Feedback", feedbackSchema);