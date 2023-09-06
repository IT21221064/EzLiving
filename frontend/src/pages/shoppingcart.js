
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import './cart.css';
import {loadStripe} from '@stripe/stripe-js';
import pay from './pay';
import { Link } from 'react-router-dom';




import Navbar from "../components/Navbar";

import Footer from "../components/Footer";


function Shoppingcart() {
  const [cartItems, setCartItems] = useState([]);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
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
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      setSpeechRecognitionSupported(true);
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
      const confirmationMessage = `Removing ${
        cartItems.find((item) => item._id === itemId).name
      } from cart. Say 'remove' to confirm or 'no' to cancel.`;
  
      if (speechSynthesisSupported) {
        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance(
          confirmationMessage
        );
        speechSynthesis.speak(speechUtterance);
      }
  
      if (speechRecognitionSupported) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
  
        // Add a delay before allowing the microphone to listen for user input
        let allowUserInput = false;
        setTimeout(() => {
          allowUserInput = true;
        }, 5000); // 3000 milliseconds (3 seconds) delay
  
        recognition.onresult = (event) => {
          if (!allowUserInput) {
            return; // Delay is active, don't process speech recognition.
          }
  
          const userResponse = event.results[0][0].transcript.toLowerCase();
  
          if (userResponse === "remove") {
            axios.delete(`http://localhost:5000/api/cart/${itemId}`);
            const updatedCartItems = cartItems.filter(
              (item) => item._id !== itemId
            );
            setCartItems(updatedCartItems);
            // Recalculate total price using the updated cartItems
            calculateTotalPrice(updatedCartItems);
            console.log("Item removed from cart.");
          } else {
            console.log("Removal canceled." + userResponse);
          }
        };
  
        recognition.start();
      }
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

  /*const pay = () => {
    const user = useAuthContext
    console.log(cartItems)
    axios.post('http://localhost:5000/api/stripe/create-checkout-session',{
      cartItems,
      userId: user._id
    }).then((res)=> {
      if(res.data.url){
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err.message));
  }*/

  return (

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
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h3 className="cart-name">{item.name}</h3>
              <p className="cart-description">{item.description}</p>
              <p className="cart-price">Price: ${item.price}</p>
              <p className="cart-quantity">
                Quantity:{' '}
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

      <Link to={`/payment?totalPrice=${totalPrice}`}>Proceed to Payment</Link>

      
  
 
    </div>
  );
}
export default Shoppingcart;
