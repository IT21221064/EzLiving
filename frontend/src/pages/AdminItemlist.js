import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminItems.css"; // Import your custom CSS file
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function AdminItemlist() {
  const [items, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:5000/api/items/" + _id)
      .then((res) => {
        alert("Item deleted successfully");
        window.location.reload();
      })
      .catch((er) => console.log(er));
  };

  const handleGenerateReport = () => {
    navigate("/report");
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
      <button onClick={handleGenerateReport} className="generate-report-button">
        Generate Report
      </button>
      <ul className="admin-product-list">
        {items.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={`http://localhost:5000/${product?.itemimage}`}
              alt={product.name}
              className="admin-cart-image"
            />
            <h2 className="admin-cart-name">{product.itemname}</h2>
            <p className="admin-cart-price">Price: ${product.unitprice}</p>
            <div className="admin-button-container">
              <Link
                to={`/updateItem/${product._id}`}
                className="button-link-update"
              >
                Update
              </Link>
              <button
                className="admin-delete-button"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
<Footer/>
    </div>
  );
}

export default AdminItemlist;
