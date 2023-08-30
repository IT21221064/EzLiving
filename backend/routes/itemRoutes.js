const express = require("express");
const router = express.Router();
const {
  getItems,
  setItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", getItems);
router.post("/", setItem);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
