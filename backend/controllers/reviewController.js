const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const upload = require("../middleware/multer"); 
const path = require("path");

// Add a review to an item
const addReview = asyncHandler(async (req, res) => {
  const { username, reviewtitle , reviewtext } = req.body;
  const reviewimage = req.file? req.file.path:null;
  try {
    // Create a new review
    const review = await Review.create({
        username,
        reviewtitle,
        reviewtext,
        reviewimage,
    });
    if (review) {
      res.status(201).json({
        reviewtitle: review.reviewtitle,
        reviewtext: review.reviewtext,
        reviewimage: review.reviewimage,
      });
    } else {
      res.status(400);
      throw new Error("Invalid input");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error-Unable to add review" });
  }
});

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to view reviews" });
  }
};

//get one review--------new
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  return res.status(200).json({
    reviewtitle: review.reviewtitle,
    reviewtext: review.reviewtext,
    reviewimage: review.reviewimage, // Include the reviewimage field in the response
  });
});



// Update a reviewnew
const updateReview = asyncHandler(async (req, res) => {
  const { reviewtitle, reviewtext } = req.body;

  if (!reviewtitle || !reviewtext) {
    return res.status(400).json({ message: "Review title and text are required" });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, { reviewtitle, reviewtext }, { new: true });

    if (updatedReview) {
      res.status(200).json({
        message: "Review updated",
        success: true,
        data: updatedReview,
      });
    } else {
      res.status(400).json({ message: "Input is invalid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete review
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }
    const deletedReview = await review.deleteOne();
    return res.status(200).json({
        message:"review deleted",
        success:true,
        data: review,
    });
    });

module.exports = {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
    getReviewById,
};