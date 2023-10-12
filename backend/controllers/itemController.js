const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");
const upload = require("../middleware/multer"); // Import the multer middleware
const path = require("path");

const getItem = asyncHandler(async (req, res) => {
  const items = await Item.find({ Item });

  return res.status(200).json(items);
});

//add items
const addItem = asyncHandler(async (req, res) => {
  console.log(req.file);
  const { itemcode, itemname, unitprice, quantity, itemdescript } = req.body;

  // Check if all required fields are provided
  if (!itemcode || !itemname || !unitprice || !quantity || !itemdescript) {
    res.status(400);
    throw new Error("Please add values");
  }

  // Check if item with the same itemcode already exists
  const itemExists = await Item.findOne({ itemcode });
  if (itemExists) {
    res.status(400);
    throw new Error("Item already exists");
  }

  try {
    // Create a new item with the uploaded image path (if available)
    const newItem = new Item({
      itemcode,
      itemname,
      unitprice,
      quantity,
      itemimage: req.file ? req.file.path : null, // Set the itemimage field with the path
      itemdescript,
    });

    // Save the item to the database
    const item = await newItem.save();

    if (item) {
      res.status(201).json({
        itemcode: item.itemcode,
        itemname: item.itemname,
        unitprice: item.unitprice,
        quantity: item.quantity,
        itemimage: item.itemimage, // Include the image path in the response
        itemdescript: item.itemdescript,
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

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  // Extract properties to update from req.body
  const { itemname, unitprice, quantity, itemdescript } = req.body;

  // Update the item properties
  if (itemname) item.itemname = itemname;
  if (unitprice) item.unitprice = unitprice;
  if (quantity) item.quantity = quantity;
  if (itemdescript) item.itemdescript = itemdescript;

  // Handle the file upload using multer for item image
  upload.single("itemimage")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      res.status(400).json({ message: "Error uploading the image" });
      return;
    }

    // Assuming the file path is available in req.file.path
    if (req.file) {
      item.itemimage = req.file.path;
    }

    // Save the updated item
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (updatedItem) {
      res.status(200).json({
        message: "Item updated",
        success: true,
        data: updatedItem,
      });
    } else {
      res.status(400).json({ message: "Invalid input" });
    }
  });
});

//delete items

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(401);
    throw new Error("Item not found");
  }
  const deletedItem = await item.deleteOne();

  return res.status(200).json({
    message: "Item deleted",
    success: true,
    data: item,
  });
});

//get one item
//get one item
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(401);
    throw new Error("Item not found");
  }
  return res.status(200).json({
    itemcode: item.itemcode,
    itemname: item.itemname,
    quantity: item.quantity,
    unitprice: item.unitprice,
    itemimage: item.itemimage, // Include the itemimage field in the response
    itemdescript: item.itemdescript,
  });
});

module.exports = {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
};
