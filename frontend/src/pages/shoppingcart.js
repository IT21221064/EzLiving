import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

function Shoppingcart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:5000/api/cart'); // Replace with your API endpoint
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      // Send a DELETE request to remove the item from the cart
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);

      // Remove the item from the cartItems state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );

      console.log('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      // Send a PUT request to update the item's quantity in the cart
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
        quantity: newQuantity,
      });

      // Update the quantity in the cartItems state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      console.log('Quantity updated.');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h1 className="cart-title">Shopping Cart</h1>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item._id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-image"
            />
            <div className="cart-details">
              <h3 className="cart-name">{item.name}</h3>
              <p className="cart-description">{item.description}</p>
              <p className="cart-price">Price: ${item.price}</p>
              <p className="cart-quantity">
                Quantity:{' '}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value))
                  }
                  className="cart-quantity-input"
                />
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="cart-remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Shoppingcart;
