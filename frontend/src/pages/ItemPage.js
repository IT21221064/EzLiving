import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";

function ItemPage() {
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemimage: "",
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
  return (
    <div>
      <h2 className="product-name">{item.itemcode}</h2>
      <h2 className="product-name">{item.itemname}</h2>
      <p className="product-description">{item.quantity}</p>
      <p className="product-description">{item.itemdescript}</p>
      <p className="product-price">Price: ${item.unitprice}</p>
    </div>
  );
}

export default ItemPage;
