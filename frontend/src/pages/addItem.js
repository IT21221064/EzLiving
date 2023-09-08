import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "./addItem.css";

function AddItem() {
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemdescript: "",
  });
  const [itemimage, setImage] = useState("");
  console.log(itemimage);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("itemcode", item.itemcode);
    formData.append("itemname", item.itemname);
    formData.append("quantity", item.quantity);
    formData.append("unitprice", item.unitprice);
    formData.append("itemdescript", item.itemdescript);
    formData.append("itemimage", itemimage); // Append the image with the correct field name

    try {
      await axios.post("http://localhost:5000/api/items/", formData);
      alert("Item added");
      navigate("/adminItemlist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h2 className="addh2">Create Item</h2>
      <div className="adddiv">
        <form className="addform" onSubmit={onSubmit}>
          <div className="column">
            <label className="addlabel">Item Code</label>
            <input
              className="addinput"
              type="text"
              id="itemcode"
              name="itemcode"
              onChange={handleChange}
            />
            <label className="addlabel">Item Name</label>
            <input
              className="addinput"
              type="text"
              id="itemname"
              name="itemname"
              onChange={handleChange}
            />
            <label className="addlabel">Item Quantity</label>
            <input
              className="addinput"
              type="number"
              id="itemquantity"
              name="quantity"
              onChange={handleChange}
            />
            <label className="addlabel">Item Price</label>
            <input
              className="addinput"
              type="text"
              id="unitprice"
              name="unitprice"
              onChange={handleChange}
            />
          </div>
          <div className="right-column">
            <label className="addlabel">Item Description</label>
            <textarea
              className="addinput addtextarea"
              id="itemdesc"
              name="itemdescript"
              onChange={handleChange}
            ></textarea>
            <label className="addlabel">Add Image</label>
            <input
              className="addinput"
              type="file"
              id="itemimage"
              name="itemimage"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="addbutton" type="submit">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
