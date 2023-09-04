import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function addItem() {
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemimage: "",
    itemdescript: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/items/", item);
      alert("Item added");
      navigate("/adminItemlist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
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
          type="text"
          id="itemimage"
          name="itemimage"
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default addItem;
