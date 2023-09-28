import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";

// Import your CSS file

function Itemlist() {
  const [items, setProducts] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const onVoiceSearch = (voiceQuery) => {
    // Filter items based on the voiceQuery and update filteredItems
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(voiceQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  const onTypingSearch = (typedQuery) => {
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(typedQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/items"); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (itemname, itemimage, unitprice) => {
    try {
      const existingCartItem = items.find(
        (cartItem) => cartItem.name === itemname
      );

      if (existingCartItem) {
        // If the item already exists in the cart, update the quantity
        const updatedCart = items.map((cartItem) => {
          if (cartItem.name === itemname) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });

        setProducts(updatedCart);
        alert("Item quantity updated in the cart.");
      } else {
        // If the item is not in the cart, add a new item
        await axios.post("http://localhost:5000/api/cart", {
          name: itemname,
          image: itemimage,
          price: unitprice,
          quantity: 1,
        });

        alert("Item added to the cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available

      const message = new SpeechSynthesisUtterance(
        "now you are at Home page, to navigate cart page press microphone button and say go to cart, to navigate feedback page say go to feedbacks,to navigate profile page say go to profile"
      );
      // Change the voice if needed
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  const renderedItems = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div>
      <Navbar />
      <Searchbar
        onVoiceSearch={onVoiceSearch}
        onTypingSearch={onTypingSearch}
      />

      <ul className="product-list">
        {renderedItems.map((product) => (
          <li key={product._id} className="product-item">
            <Link to={`/itempage/${product._id}`} className="card-link">
              <img
                src={`http://localhost:5000/${product?.itemimage}`}
                alt={product.name}
                className="cart-image"
              />
            </Link>
            {console.log(`http://localhost:5000/${product?.itemimage}`)}
            <h2 className="cart-name">{product.itemname}</h2>
            <p className="cart-price">Price: ${product.unitprice}</p>
            <center>
              <button
                className="add-button"
                onClick={() =>
                  addToCart(
                    product.itemname,
                    product.itemimage,
                    product.unitprice
                  )
                }
              >
                Add to Cart
              </button>
            </center>
          </li>
        ))}
      </ul>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default Itemlist;
