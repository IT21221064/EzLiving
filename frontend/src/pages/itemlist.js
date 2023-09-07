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
      const existingCartItem = items.find((cartItem) => cartItem.name === itemname);
  
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
  
  

  return (
    <div>
      <Navbar />
      <Searchbar  />

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

export default itemlist;
