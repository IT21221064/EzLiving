import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function UpdateItem() {
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemimage: "",
    itemdescript: "",
  });

  const Navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/items/" + _id, item);
      alert("Item updated");
      Navigate('/adminItemlist')
      // Optionally, you can reset the form or perform any other actions after a successful update.
    } catch (err) {
      console.error(err);
    }
  };

  const { _id } = useParams();
  useEffect(() => {
    // Fetch the existing item data based on item code when the component loads
    try {
      axios
        .get("http://localhost:5000/api/items/" + _id)
        // Update the 'item' state with the retrieved data
        .then((res) => {
          setItem({
            ...item,
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
      <AdminNavbar />
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Code</label>
        <input
          type="text"
          name="itemcode"
          value={item.itemcode}
          onChange={(e) => setItem({ ...item, itemcode: e.target.value })}
        />
        <label>Item Name</label>
        <input
          type="text"
          name="itemname"
          value={item.itemname}
          onChange={(e) => setItem({ ...item, itemname: e.target.value })}
        />
        <label>Item Quantity</label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
        <label>Item Price</label>
        <input
          type="text"
          name="unitprice"
          value={item.unitprice}
          onChange={(e) => setItem({ ...item, unitprice: e.target.value })}
        />
        <label>Item Description</label>
        <textarea
          name="itemdesc"
          value={item.itemdescript}
          onChange={(e) => setItem({ ...item, itemdescript: e.target.value })}
        ></textarea>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateItem;
