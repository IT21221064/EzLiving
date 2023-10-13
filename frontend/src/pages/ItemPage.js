import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , Link } from "react-router-dom";
import Review from "./ReviewList";
import "./singleItem.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";

function ItemPage() {
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState("");
  const [item, setItem] = useState({
    itemcode: "",
    itemname: "",
    quantity: 0,
    unitprice: "",
    itemdescript: "",
  });
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
    const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
    useState(false);
    const [prhasSpokenWelcome, setprHasSpokenWelcome] = useState(false);

  const { _id } = useParams();
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
  
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/singleItem/deuteranopiaItemlist.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/singleItem/protanopiaItemlist.css");
          break;
        case "tritanopia":
           import("../pages/colorblinds/singleItem/tritanopiaItemlist.css");
          break;
        default:
           import("./ProductList.css"); 
          break;
      }
    };

    importCSSBasedOnType();
  }, [type]);
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
    if ("speechSynthesis" in window) {
      setSpeechSynthesisSupported(true);
    }
  }, []);

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
  
      // Show a confirmation message using SweetAlert2
      Swal.fire({
        title: "Product added to cart!",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500, // Auto close after 1.5 seconds
      });
  
      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
  
      // Show an error message using SweetAlert2
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the product to the cart.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  const speakText = () => {
    if (speechSynthesisSupported) {
      const speechSynthesis = window.speechSynthesis;

      // Combine item name, description, and price for text-to-speech
      const textToSpeak = `${item.itemname}. ${item.itemdescript}. Price: $${item.unitprice}.`;

      // Create a speech utterance and speak it
      const speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthesis.speak(speechUtterance);
    } else {
      console.log("Speech synthesis is not supported in this browser.");
    }
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at product page");
         // Change the voice if needed
        window.speechSynthesis.speak(message);
        setHasSpokenWelcome(true);
    
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [0]);
 

  return (
    <div>
      <Navbar />
      <img
        src={`http://localhost:5000/${item?.itemimage}`}
        alt={item.name}
        className="single-image"
      />
      {console.log(`http://localhost:5000/${item?.itemimage}`)}
      <div className="single-details">
        <button className="btn-speak" onClick={speakText} disabled={!speechSynthesisSupported}>
          Speak
        </button>
       
        <h2 className="cart-name">{item.itemname}</h2>
        <h2 className="cart-description">Quantity: {item.quantity}</h2>
        <p className="cart-description">description: {item.itemdescript}</p>
        <p className="cart-price">Price: ${item.unitprice}</p>
        <button
          className="add-button"
          onClick={() =>
            addToCart(item.itemname, item.itemimage, item.unitprice)
          }
        >
          Add to Cart
        </button>
        <Link to="/Review">
        <button className="add-button">View Reviews</button>
      </Link>
      </div>
      <br></br>
    
      <Footer />
    </div>
  );
}

export default ItemPage;
