import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Import your CSS file
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminItemlist() {
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

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:5000/api/items/" + _id)
      .then((res) => {
        // You may want to update the state or perform other actions after a successful delete
        alert("Item deleted successfully");
        location.reload();
      })
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <AdminNavbar />
      <h1>Product List</h1>
      <Link to={`/AddItem`}>Add Item</Link>
      <ul className="product-list">
        {items.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={`http://localhost:5000/${product?.itemimage}`}
              alt={product.name}
              className="cart-image"
            />
            <h2 className="cart-name">{product.itemname}</h2>
            <p className="cart-price">Price: ${product.unitprice}</p>
            <Link to={`/updateItem/${product._id}`}>Update</Link>
            <button
              className="add-to-cart-button"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminItemlist;
