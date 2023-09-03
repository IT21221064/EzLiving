const Feedback = require("../models/feedbackModel");
const asyncHandler = require("express-async-handler");

const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Item.find({ Feedback });

  return res.status(200).json(feedback);
});

//add items
const addFeedback = asyncHandler(async (req, res) => {
  const { feedbacktitle, feedbacktext} = req.body;

  // Check if all required fields are provided
  if (!feedbacktitle || !feedbacktext) {
    res.status(400);
    throw new Error("Please add texts");
  }

  try {
    const feedback = await Feedback.create({
        feedbacktext,
        feedbacktitle,
    });

    if (feedback) {
      res.status(201).json({
        feedbacktitle: feedback.feedbacktitle,
        feedbacktext: feedback.feedbacktext,
      });
    } else {
      res.status(400);
      throw new Error("Invalid input");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//update items
const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("feedback not found");
  }

  const { feedbacktitle, feedbacktext } = req.body;

  if (feedbacktitle) feedback.feedbacktitle = feedbacktitle;
  if (feedbacktext) feedback.feedbacktext = feedbacktext;

    // Save the updated item
    const upadtedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (upadtedFeedback) {
      res.status(200).json({
        message: "Feedback updated",
        success: true,
        data: upadtedFeedback,
      });
    } else {
      res.status(400).json({ message: "Invalid input" });
    }
});

//delete items
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(401);
    throw new Error("Item not found");
  }
  const deletedFeedback = await feedback.deleteOne();

  return res.status(200).json({
    message: "Feedback deleted",
    success: true,
    data: feedback,
  });
});

//get one item
const getFeedbackById = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(401);
    throw new Error("Feedback not found");
  }
  return res.status(200).json(item);
});

module.exports = {
    getFeedback,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById,
};
