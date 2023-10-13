const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Set the destination folder for temporary file storage
const router = express.Router();
const {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
} = require("../controllers/ItemController");

// Define the route for adding items, including image upload
router
  .route("/")
  .get(getItem) // Handle GET requests for items
  .post(upload.single("itemimage"), addItem); // Handle POST requests for adding items with image upload

// Define the route for a specific item by ID
router
  .route("/:id")
  .get(getItemById) // Handle GET requests for a specific item by ID
  .put(updateItem) // Handle PUT requests to update a specific item by ID
  .delete(deleteItem); // Handle DELETE requests to delete a specific item by ID

module.exports = router;
