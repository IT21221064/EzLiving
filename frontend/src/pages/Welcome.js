import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function Welcome() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    const lowercaseTranscript = transcript.toLowerCase();

    if (lowercaseTranscript.includes("go to user login")) {
      navigate("/login");
    } else if (lowercaseTranscript.includes("go to cart")) {
      navigate("/cart");
    } else if (lowercaseTranscript.includes("go to feedbacks")) {
      navigate("/Feedback");
    } else if (lowercaseTranscript.includes("go to admin login")) {
      navigate("/adminlogin");
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);

      if (!hasSpokenWelcome) {
        setHasSpokenWelcome(true);
      }
    } else {
      recognition.stop();
      recognition.start();
    }
  };

  const handleStartListening = () => {
    handleMicClick();
  };

  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("Welcome to easy living. To navigate to the user login page, please click the microphone and say 'go to user login'.");
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
      <div className="welcomecontainer">
        <h2 className="welcomeh1">Welcome to </h2>
        <br />
        <div className="center-content">
          <img src="/images/EYELogo.png" alt="Logo" />

          <p className="welcomedescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            libero quis lacus tincidunt vehicula.
          </p>
        </div>
        <p className="instructionText">Please select your login type:</p>
        <Link to="/login" className="btn-user">
          User Login
        </Link>
        <Link to="/adminlogin" className="adminbtn">
          Admin Login
        </Link>

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
