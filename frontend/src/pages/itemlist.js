import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";

function Itemlist() {
  const [items, setProducts] = useState([]);
  const [User, setUser] = useState(null);
  const { user } = useAuthContext();
  const [filteredItems, setFilteredItems] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  // Function to map user type to CSS file path

  const onVoiceSearch = (voiceQuery) => {
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
        const response = await axios.get("http://localhost:5000/api/items");
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
      const message = new SpeechSynthesisUtterance(
        "now you are at Home page, to navigate cart page press microphone button and say go to cart, to navigate feedback page say go to feedbacks, to navigate profile page say go to profile"
      );
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const renderedItems = filteredItems.length > 0 ? filteredItems : items;

  useEffect(() => {
    const fetchProfileType = async () => {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.userid}`
      );
      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    };
    if (user != null) {
      fetchProfileType();
    }
  }, [user]);

  // Get the CSS file path based on the user's type

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
