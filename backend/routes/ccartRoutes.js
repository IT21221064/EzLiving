const express = require("express");
const { addItemToCart } = require("../controllers/ccartController");

const router = express.Router();

router.post("/user/ccart/addtocart", addItemToCart);

module.exports = router;
