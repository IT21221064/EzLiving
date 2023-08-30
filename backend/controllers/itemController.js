const asynchandler = require("express-async-handler");

// @desc Get items
// @route GET /api/items
// @access private
const getItems = asynchandler(async (req, res) => {
  res.status(200).json({ message: "Get items" });
});
// @desc set item
// @route POST /api/items
// @access private
const setItem = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "set item" });
});
// @desc Get item
// @route GET /api/items/:id
// @access private
const getItem = asynchandler(async (req, res) => {
  res.status(200).json({ message: `Get item ${req.params.id}` });
});
// @desc update item
// @route POST /api/items/:id
// @access private
const updateItem = asynchandler(async (req, res) => {
  res.status(200).json({ message: `Update item ${req.params.id}` });
});
// @desc Delete item
// @route Delete /api/items/:id
// @access private
const deleteItem = asynchandler(async (req, res) => {
  res.status(200).json({ message: `Delete item ${req.params.id}` });
});

module.exports = {
  getItems,
  setItem,
  getItem,
  updateItem,
  deleteItem,
};
