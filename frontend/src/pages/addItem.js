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
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!item.itemcode.match(/^[A-Z0-9]+$/)) {
      errors.itemcode =
        "Item code must contain only uppercase letters and numbers.";
    }

    if (item.quantity < 1) {
      errors.quantity = "Item quantity must be greater than 0.";
    }

    if (!item.unitprice.match(/^\d+(\.\d{1,2})?$/)) {
      errors.unitprice = "Invalid price format. Use 0.00 format.";
    }

    return errors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("itemcode", item.itemcode);
      formData.append("itemname", item.itemname);
      formData.append("quantity", item.quantity);
      formData.append("unitprice", item.unitprice);
      formData.append("itemdescript", item.itemdescript);
      formData.append("itemimage", itemimage);

      try {
        await axios.post("http://localhost:5000/api/items/", formData);
        alert("Item added");
        navigate("/adminItemlist");
      } catch (err) {
        console.error(err);
      }
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
              className={`addinput ${formErrors.itemcode ? "error" : ""}`}
              type="text"
              id="itemcode"
              name="itemcode"
              onChange={handleChange}
              required
            />
            {formErrors.itemcode && (
              <span className="error-message">{formErrors.itemcode}</span>
            )}

            <label className="addlabel">Item Name</label>
            <input
              className={`addinput ${formErrors.itemname ? "error" : ""}`}
              type="text"
              id="itemname"
              name="itemname"
              onChange={handleChange}
              required
            />
            {formErrors.itemname && (
              <span className="error-message">{formErrors.itemname}</span>
            )}

            <label className="addlabel">Item Quantity</label>
            <input
              className={`addinput ${formErrors.quantity ? "error" : ""}`}
              type="number"
              id="itemquantity"
              name="quantity"
              onChange={handleChange}
              required
              min="1"
            />
            {formErrors.quantity && (
              <span className="error-message">{formErrors.quantity}</span>
            )}

            <label className="addlabel">Item Price</label>
            <input
              className={`addinput ${formErrors.unitprice ? "error" : ""}`}
              type="text"
              id="unitprice"
              name="unitprice"
              onChange={handleChange}
              required
            />
            {formErrors.unitprice && (
              <span className="error-message">{formErrors.unitprice}</span>
            )}
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
