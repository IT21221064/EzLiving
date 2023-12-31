import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';

function Itemlist() {
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState("");
  const [items, setProducts] = useState([]);
  const [User, setUser] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  // Define the 'type' variable with a default value
    console.log("type"+type);
  // Import CSS files conditionally based on 'type'
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/ItemlistPageCSS/deuteranopiaItemlist.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/ItemlistPageCSS/protanopiaItemlist.css");
          break;
        case "tritanopia":
           import("../pages/colorblinds/ItemlistPageCSS/tritanopiaItemlist.css");
          break;
        default:
           import("./ProductList.css"); 
          break;
      }
    };

    importCSSBasedOnType();
  }, [type]);

  const onVoiceSearch = (voiceQuery) => {
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(voiceQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const onTypingSearch = (typedQuery) => {
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(typedQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

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

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Fetch the user's ID here and set it to the state
        const response = await fetch(
          `http://localhost:5000/api/users/${user.userid}`
        );
        const json = await response.json();
        console.log(json.username);

        if (response.ok) {
          setUsername(json.username);
          setType(json.type);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, [user]);

  const addToCart = async (productName, productImage, productPrice) => {
    try {
      // Send the userID along with other product data
      await axios.post("http://localhost:5000/api/cart", {
        username: uname, // Use the userID from the state
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: 1,
      });
  
      console.log("Product added to cart.");
  
      // Show a success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Item Added to Cart',
        text: 'The item has been successfully added to your cart.',
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  

  useEffect(() => {
    if (!hasSpokenWelcome) {
      const message = new SpeechSynthesisUtterance(
        "Now you are at the Home page. To navigate to the cart page, press the microphone button and say 'go to cart.' To navigate to the feedback page, say 'go to feedbacks.' To navigate to the profile page, say 'go to profile.'"
      );
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const fetchProfileType = async () => {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.userid}`
      );
      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    };
    if (user != null) {
      fetchProfileType();
    }
  }, [user]);

  const renderedItems = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div>
      <Navbar />
      <Searchbar
        onVoiceSearch={onVoiceSearch}
        onTypingSearch={onTypingSearch}
      />

      <ul className="product-list">
        {renderedItems.map((product) => (
          <li key={product._id} className="product-item">
            <Link to={`/itempage/${product._id}`} className="card-link">
              <div className="product-item1">
              <img
                src={`http://localhost:5000/${product?.itemimage}`}
                alt={product.name}
                className="cart-image"
              />
              </div>
            </Link>
            {console.log(`http://localhost:5000/${product?.itemimage}`)}
            <h2 className="cart-names">{product.itemname}</h2>
            <p className="cart-prices">Price: ${product.unitprice}</p>
            <center>
              <button
                className="add-button"
                onClick={() =>
                  addToCart(
                    product.itemname,
                    product.itemimage,
                    product.unitprice
                  )
                }
              >
                Add to Cart
              </button>
            </center>
          </li>
        ))}
      </ul>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default Itemlist;
