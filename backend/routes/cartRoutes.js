const express = require('express');
const router = express.Router();
const requireUserAuth = require('../middleware/requireUserAuth'); // Import your user authentication middleware
const Cart = require('../models/cart');

const {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    deleteCartItem
} = require('../controllers/cartController');

// Protect the cart routes with requireUserAuth middleware
router.use(requireUserAuth);

// Add a product to the cart
router.post('/', addToCart);

// Get all cart items
router.get('/', getCartItems);

// Update a cart item's quantity
router.put('/:id', updateCartItemQuantity);

// Delete a cart item
router.delete('/:id', deleteCartItem);

module.exports = router;
