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
      // Send a POST request to add the product to the cart
      await axios.post("http://localhost:5000/api/cart", {
        name: itemname,
        image: itemimage,
        price: unitprice,
        quantity: 1, // Set a default quantity (you can adjust this as needed)
      });

      alert("Item added successfully");
      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const onVoiceSearch = (voiceQuery) => {
    // Filter items based on the voiceQuery and update filteredItems
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(voiceQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at Home page");
         // Change the voice if needed
        window.speechSynthesis.speak(message);
        setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Searchbar onVoiceSearch={onVoiceSearch} />

      <ul className="product-list">
        {items.map((product) => (
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
                className="cart-add-button"
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
