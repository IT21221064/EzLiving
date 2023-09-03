const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const upload = require("../middleware/multer"); 
const path = require("path");

// Add a review to an item
const addReview = asyncHandler(async (req, res) => {
  const { reviewtitle , reviewtext } = req.body;
  const reviewimage = req.file? req.file.path:null;
  try {
    // Create a new review
    const review = await Review.create({
        reviewtitle,
        reviewtext,
        reviewimage,
    });
      res.status(201).json({
        reviewtitle: review.reviewtitle,
        reviewtext: review.reviewtext,
        reviewimage: review.reviewimage,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error-Unable to add review" });
  }
});

// Get all reviews
const getReviews = asyncHandler(async(req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to view reviews" });
  }
});

//get one review
const getReviewById = asyncHandler(async(req,res)=>{
    const review = await Review.findById(req.params.id);
    if(!review){
        res.status(404);
        throw new error("review not found");
    }
    return res.status(200).json(review);
});

// Update a review
const updateReview = asyncHandler( async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const { reviewtitle, reviewtext} = req.body;

    //update review properties
    if(reviewtitle) review.reviewtitle = reviewtitle;
    if(reviewtext) review.reviewtext = reviewtext;

        //save the updated review
        const updateReview = await Review.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        });
        if(updateReview){
            res.status(200).json({
                message:"Review updated",
                success:true,
                data:updateReview,
            });
            }else{
                res.status(400).json({message: "input is invalid"});
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