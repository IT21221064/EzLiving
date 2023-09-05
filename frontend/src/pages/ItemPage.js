import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductList.css";

function ItemPage() {
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemdescript: "",
  });

  const { _id } = useParams();
  useEffect(() => {
    // Fetch the existing item data based on item ID when the component loads
    try {
      axios.get("http://localhost:5000/api/items/" + _id).then((res) => {
        setItem({
          itemcode: res.data.itemcode,
          itemname: res.data.itemname,
          quantity: res.data.quantity,
          unitprice: res.data.unitprice,
          itemimage: res.data.itemimage,
          itemdescript: res.data.itemdescript,
        });
      });
    } catch (err) {
      console.error(err);
    }
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

  return (
    <div>
      <img
        src={`http://localhost:5000/${item?.itemimage}`}
        alt={item.name}
        className="product-image"
      />
      {console.log(`http://localhost:5000/${item?.itemimage}`)}
      <h2 className="cart-name">{item.itemcode}</h2>
      <h2 className="cart-name">{item.itemname}</h2>
      <p className="cart-description">{item.quantity}</p>
      <p className="cart-description">{item.itemdescript}</p>
      <p className="cart-price">Price: ${item.unitprice}</p>
      <button
        className="cart-add-button"
        onClick={() => addToCart(item.itemname, item.itemimage, item.unitprice)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ItemPage;
