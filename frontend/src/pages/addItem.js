import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function addItem() {
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
  const formData = new FormData();
  formData.append("itemimage", itemimage);
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
      <h2>Create Item</h2>
      <form onSubmit={onSubmit}>
        <label>Item Code</label>
        <input
          type="text"
          id="itemcode"
          name="itemcode"
          onChange={handleChange}
        />
        <label>Item Name</label>
        <input
          type="text"
          id="itemname"
          name="itemname"
          onChange={handleChange}
        />
        <label>Item Quantity</label>
        <input
          type="number"
          id="itemquantity"
          name="quantity"
          onChange={handleChange}
        />
        <label>Item Price</label>
        <input
          type="text"
          id="unitprice"
          name="unitprice"
          onChange={handleChange}
        />
        <label>Item Description</label>
        <textarea
          id="itemdesc"
          name="itemdescript"
          onChange={handleChange}
        ></textarea>
        <label>Add Image</label>
        <input
          type="File"
          id="itemimage"
          name="itemimage"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default addItem;
