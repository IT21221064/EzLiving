import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

function ProductList() {
  const { user } = useAuthContext()
  const [products, setProducts] = useState([]);
  const [ID, setUserID] = useState(""); 


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); 
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Fetch the user's ID here and set it to the state
        const response = await fetch(`http://localhost:5000/api/users/${user.userid}`);
        const json = await response.json();
        console.log(json.username);

        if (response.ok) {

          setUserID(json.userid);
        } 
      } catch (error) {
        console.error(error);
      }
    }
      fetchProfile();
    
  }, [user]); 

  if (!ID) {
    console.log("User ID is missing");
    return null; 
  }

  const addToCart = async (productName, productImage, productPrice) => {
    try {
      
      // Send the userID along with other product data
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userID: ID, // Use the userID from the state
          name: productName,
          image: productImage,
          price: productPrice,
          quantity: 1,
        }
      );

      console.log("Product added to cart."+ID+"id");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <button
              className="add-to-cart-button"
              onClick={() =>
                addToCart(
                  product.name,
                  product.imageUrl,
                  product.price
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

export default ProductList;
