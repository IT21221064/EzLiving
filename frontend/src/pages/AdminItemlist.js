import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminItems.css"; // Import your CSS file
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
        window.location.reload()
       
      })
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <AdminNavbar />
      <br />

      <Link to={`/AddItem`} className="button-link-add">
        Add Item
      </Link>
      <br />
      <br />
      <br />
      <br />
      <ul className="adminproduct-list">
        {items.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={`http://localhost:5000/${product?.itemimage}`}
              alt={product.name}
              className="admincart-image"
            />
            <h2 className="admincart-name">{product.itemname}</h2>
            <p className="admincart-price">Price: ${product.unitprice}</p>
            <div className="adminbutton-container">
              <Link to={`/updateItem/${product._id}`} className="button-link-update">
                Update
              </Link>
              <button
                className="admindelete-button"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminItemlist;
