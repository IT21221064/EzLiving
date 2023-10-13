const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

// Add an item to the cart
// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    // Extract product details from the request body
    const { username, name, image, price, quantity } = req.body;

    // Check if the product with the same name already exists in the user's cart
    let cartItem = await Cart.findOne({ username, name });

    if (cartItem) {
      // If it exists, update the quantity by adding the new quantity to the existing quantity
      cartItem.quantity += quantity;
    } else {
      // If it doesn't exist, create a new cart item
      cartItem = new Cart({
        username,   // User details
        name,
        image,
        price,
        quantity,
        // Add more user details here, if needed
      });
    }

    // Save the cart item to the database
    await cartItem.save();

    res.json({ message: "Product added to cart." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server Error - Unable to add product to cart" });
  }
};

// Get all cart items for a specific user
const getCartItems = async (req, res) => {
  try {
    if (!req.query.uname) {
      return res.status(400).json({ message: "Username is required" });
    }

    const username = req.query.uname; // Retrieve username from query parameter
    const cartItems = await Cart.find({ username }); // Retrieve cart items based on the username
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

const clearCart = asyncHandler(async (req, res) => {
  try {
    await Cart.deleteMany({}); // This will delete all items in the cart
    res.json({ message: "Cart has been cleared." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to clear the cart" });
  }
});




module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart

};