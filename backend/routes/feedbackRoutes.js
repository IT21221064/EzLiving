const express = require("express");
const router = express.Router();
const {
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackById,
} = require("../controllers/feedbackController");

router
  .route("/")
  .get(getFeedback) 
  .post(addFeedback); 
router
  .route("/:id")
  .get(getFeedbackById)
  .put(updateFeedback) 
  .delete(deleteFeedback); 

module.exports = router;
