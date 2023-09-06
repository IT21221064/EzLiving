import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css"; // Import a CSS file for custom styles

function Navbar() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    const lowercaseTranscript = transcript.toLowerCase();

    if (lowercaseTranscript.includes("go to home")) {
      navigate("/items");
    } else if (lowercaseTranscript.includes("go to cart")) {
      navigate("/cart");
    } else if (lowercaseTranscript.includes("go to feedbacks")) {
      navigate("/Feedback");
    }
  };


  const handleMicClick = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      // Stop and re-start the recognition process
      recognition.stop();
      recognition.start();
    }
  };

  const handleStartListening = () => {
    // Start listening for voice input only when the search button is clicked
    handleMicClick();
  };


  return (
    <div className="navbar-container">
      <button
        className="mic-button"
        onClick={handleStartListening}
        aria-label="Start Listening"
      >
        <FontAwesomeIcon icon={faMicrophone} aria-hidden="true" />
      </button>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img className="nav-logo" src="/images/EYELogo.png" alt="Logo" />
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/items" className="text">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="text">
              Feedbacks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="text">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="text">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="text"
              onClick={(e) => {
                e.preventDefault();
                // Handle logout logic here
                // For example, clear user session and navigate to the login page
                navigate("/login");
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
