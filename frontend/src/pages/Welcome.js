import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function Welcome() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    const lowercaseTranscript = transcript.toLowerCase();

    if (lowercaseTranscript.includes("go to user login")) {
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
    // Start listening for voice input only when the mic button is clicked
    handleMicClick();
  };

  return (
    <div>
      <div className="welcomecontainer">
        <h1 className="welcomeh1">Welcome to Our Website</h1>
        <div className="center-content">
          <img
            src="/path/to/your/image.png" // Replace with the actual image path
            alt="Website Logo"
            className="welcomelogo"
          />
          <p className="welcomedescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            libero quis lacus tincidunt vehicula.
          </p>
        </div>
        <p>Please select your login type:</p>
        <Link to="/user-login" className="btn btn-user">
          User Login
        </Link>
        <Link to="/admin-login" className="adminbtn">
          Admin Login
        </Link>

        {/* Mic button */}
        <button
          className="mic-button"
          onClick={handleStartListening}
          aria-label="Start Listening"
        >
          <FontAwesomeIcon icon={faMicrophone} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default Welcome;
