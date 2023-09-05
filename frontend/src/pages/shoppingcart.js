import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cart.css";
import Navbar from "../components/Navbar";

function Shoppingcart() {
  const [cartItems, setCartItems] = useState([]);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCartItems(response.data);
        calculateTotalPrice(response.data); // Calculate and set the total price
      } catch (error) {
        console.error(error);
      }
    }

    fetchCartItems();

    if ("speechSynthesis" in window) {
      setSpeechSynthesisSupported(true);
    }
  }, []);

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      // Recalculate total price using the updated cartItems
      calculateTotalPrice(updatedCartItems);
      console.log("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
        quantity: newQuantity,
      });
      const updatedCartItems = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);
      // Recalculate total price using the updated cartItems
      calculateTotalPrice(updatedCartItems);
      console.log("Quantity updated.");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const speakText = () => {
    if (speechSynthesisSupported) {
      const speechSynthesis = window.speechSynthesis;

      const speechItems = cartItems.map((item) => {
        const itemText = `Product: ${item.name}, Quantity: ${
          item.quantity
        }, Unit Price: $${item.price.toFixed(2)}`;
        return itemText;
      });

      const totalText = `Total Price: $${totalPrice.toFixed(2)}`;
      speechItems.push(totalText);

      for (const itemText of speechItems) {
        const speechUtterance = new SpeechSynthesisUtterance(itemText);
        speechSynthesis.speak(speechUtterance);
      }
    } else {
      console.log("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="shopping-cart">
        <h1 className="cart-title">Shopping Cart</h1>
        <button
          onClick={speakText}
          className="speak-total-button"
          disabled={!speechSynthesisSupported}
        >
          Speak
        </button>
        <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
              <img
                src={`http://localhost:5000/${item?.image}`}
                alt={item.name}
                className="product-image"
              />
              {console.log(`http://localhost:5000/${item?.image}`)}
              <div className="cart-details">
                <h3 className="cart-name">{item.name}</h3>
                <p className="cart-description">{item.description}</p>
                <p className="cart-price">Price: ${item.price}</p>
                <p className="cart-quantity">
                  Quantity:{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
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
      </div>
    </>
  );
}

export default Shoppingcart;
