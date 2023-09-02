const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Set the destination folder for temporary file storage
const router = express.Router();
const {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
    getReviewById,
} = require("../controllers/reviewController");

router
  .route("/")
  .get(getReviews)
  .post(upload.single("reviewimage"), addReview); //POST requests for adding review with image

router
  .route("/:id")
  .get(getReviewById)
  .put(updateReview) 
  .delete(deleteReview);

module.exports = router;
