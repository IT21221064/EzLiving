import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
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
import { useAuthContext } from "../hooks/useAuthContext";

function Itemlist() {
  const { user } = useAuthContext()
  const [uname, setUsername] = useState(""); 
  const [items, setProducts] = useState([]);
  const [User, setUser] = useState(null);
  const { user } = useAuthContext();
  const [filteredItems, setFilteredItems] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  // Function to map user type to CSS file path
  const mapUserTypeToCSSFilePath = (type) => {
    switch (type) {
      case "protanopia":
        return "../pages/colorblind/ItemlistPageCSS/protanopiaItemlist.css"; // Path to theme1.css
      case "deuteranopia":
        return "../pages/colorblind/ItemlistPageCSS/deuteranopiaItemlist.css"; // Path to theme2.css
      case "tritanopia":
        return "../pages/colorblind/ItemlistPageCSS/tritanopiaItemlist.css"; // Path to theme3.css
      default:
        return "./ProductList.css"; // Default CSS file path
    }
  };

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
        const response = await fetch(`http://localhost:5000/api/users/${user.userid}`);
        const json = await response.json();
        console.log(json.username);

        if (response.ok) {


          setUsername(json.username);
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
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          username: uname, // Use the userID from the state
          name: productName,
          image: productImage,
          price: productPrice,

          quantity: 1,
        }
      );

      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const onVoiceSearch = (voiceQuery) => {
    // Filter items based on the voiceQuery and update filteredItems
    const filtered = items.filter((item) =>
      item.itemname.toLowerCase().includes(voiceQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };


  useEffect(() => {
    if (!hasSpokenWelcome) {
      const message = new SpeechSynthesisUtterance(
        "now you are at Home page, to navigate cart page press microphone button and say go to cart, to navigate feedback page say go to feedbacks, to navigate profile page say go to profile"
      );
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const renderedItems = filteredItems.length > 0 ? filteredItems : items;

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

  // Get the CSS file path based on the user's type
  const cssFilePath = mapUserTypeToCSSFilePath(User?.type);

  return (
    <div>
      {/* Apply the CSS file based on the user's type */}
      <link rel="stylesheet" href={cssFilePath} />
      <Navbar />
      <Searchbar
        onVoiceSearch={onVoiceSearch}
        onTypingSearch={onTypingSearch}
      />

      <ul className="product-list">
        {renderedItems.map((product) => (
          <li key={product._id} className="product-item">
            <Link to={`/itempage/${product._id}`} className="card-link">
              <img
                src={`http://localhost:5000/${product?.itemimage}`}
                alt={product.name}
                className="cart-image"
              />
            </Link>
            {console.log(`http://localhost:5000/${product?.itemimage}`)}
            <h2 className="cart-name">{product.itemname}</h2>
            <p className="cart-price">Price: ${product.unitprice}</p>
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
