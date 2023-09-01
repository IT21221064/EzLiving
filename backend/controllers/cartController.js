const Cart = require("../models/cart");

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { name, image, price, quantity } = req.body;

    // Create a new cart item
    const cartItem = new Cart({
      name,
      image,
      price,
      quantity,
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to add to cart" });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
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
