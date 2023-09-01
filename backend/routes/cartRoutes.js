const express = require("express");
const router = express.Router();
const {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    deleteCartItem

} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCartItems);
router.put("/:id", updateCartItemQuantity);
router.delete("/:id", deleteCartItem);

module.exports = router;