import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Import your CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(""); // State to store the JWT token
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Retrieve the user ID

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const addToCart = async ( productName, productImage, productPrice) => {
    try {
    
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userID: userId,
          name: productName,
          image: productImage,
          price: productPrice,
          quantity: 1,
        },
        { headers }
      );

      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };



  return (
    <div>
      <header>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </header>
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
