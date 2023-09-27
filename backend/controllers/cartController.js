const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { userID, name, image, price, quantity } = req.body;

    const existingCartItem = await Cart.findOne({ userID: req.user._id, name });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      const cartItem = new Cart({
        userID: req.user._id,
        name,
        image,
        price,
        quantity,
      });
      await cartItem.save();
    }

    res.json({ message: "Product added to cart." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server Error - Unable to add product to cart" });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const cartItems = await Cart.find({ userID: req.user._id });
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to get cart items" });
  }
};

// Update a cart item's quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to update cart item" });
  }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndRemove(req.params.id);

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to delete cart item" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
};
