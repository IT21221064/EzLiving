import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

// Import your CSS file

function itemlist() {
  const [items, setProducts] = useState([]);

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
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  // Callback function to start listening
  const startListening = () => {
    setIsListening(true);
  };

  return (
    <div>
      <Navbar isListening={isListening} startListening={startListening} />
      <Searchbar isListening={isListening} startListening={startListening} />
      <h1>Product List</h1>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default itemlist;
