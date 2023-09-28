const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

const {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    deleteCartItem,
    deleteAllCartItems,
} = require('../controllers/cartController');




// Add a product to the cart
router.post('/', addToCart);

// Get all cart items
router.get('/', getCartItems);

// Update a cart item's quantity
router.put('/:id', updateCartItemQuantity);

// Delete a cart item
router.delete('/:id', deleteCartItem);

router.delete('/', deleteAllCartItems);

module.exports = router;
