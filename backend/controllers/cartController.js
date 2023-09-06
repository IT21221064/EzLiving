const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

// Add an item to the cart
const addToCart = asyncHandler(async (req, res) => {
  const { name, image, price, quantity } = req.body;
  try {
    // Create a new cart item
    const cartItem = await Cart.create({
      name,
      image,
      price,
      quantity,
    });
    if (cartItem) {
      res.status(201).json({
        name: cartItem.name,
        image: cartItem.image,
        price: cartItem.price,
        quantity: cartItem.quantity,
      });
    } else {
      res.status(400);
      throw new Error("Invalid input");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to add to cart" });
  }
});

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
    console.log(cartItems)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json( { message: "Server Error - Unable to get cart items" });
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
    res
      .status(500)
      .json({ message: "Server Error - Unable to update cart item" });
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
    res
      .status(500)
      .json({ message: "Server Error - Unable to delete cart item" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
};