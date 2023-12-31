import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';

function AddFeedback() {
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState(""); 
  const [feedback, setFeedback] = useState({
    feedbacktitle: "",
    feedbacktext: "",
  });

  console.log("type"+type);
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/Addreview/deuternopiafeedback.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/Addreview/protanopiafeedback.css");
          break;
        case "tritanopia":
           import("../pages/colorblinds/Addreview/tritanopiafeedback.css");
          break;
        default:
           import("../pages/colorblinds/Addreview/feedback.css");
          break;
      }
    };

    importCSSBasedOnType();
  }, [type]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.userid}`);
        const json = await response.json();
        const username = json.username;
  
        if (response.ok) {
          setUsername(username);
          setType(json.type);
        } 
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, [user]);

  const [isListening, setIsListening] = useState(false);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const navigate = useNavigate();

  const startRecognition = (field) => {
    setActiveField(field);
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
   
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFeedback({ ...feedback, [field]: transcript });
      setActiveField(null);
      setIsListening(false);
      recognition.stop();
    };
  };

  const [activeField, setActiveField] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback);
      Swal.fire({
        icon: 'success',
        title: 'Feedback added',
        text: 'The feedback has successfully added',
      });
      navigate("/feedback");
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the feedback.");
    }
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at add feedback page");
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
      <h1 className="feedback-heading">Tell us about what u feel about our website..</h1>
      <Link to="/Feedback" className="feedback-link">
        <button className="link-button">View Feedbacks</button>
      </Link>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label>Feedback Title</label>
          <div className="input-with-button">
            <input
              type="text"
              id="feedbacktitle"
              name="feedbacktitle"
              value={feedback.feedbacktitle}
              onChange={handleChange}
            />
            <button type="button" onClick={() => startRecognition("feedbacktitle")}>
              {isListening ? "Listening..." : "Speak"}
            </button>
          </div>
        </div>
        <div className="input-container">
          <label>Feedback Text</label>
          <div className="input-with-button">
            <textarea
              id="feedbacktext"
              name="feedbacktext"
              value={feedback.feedbacktext}
              onChange={handleChange}
            ></textarea>
            <button type="button" onClick={() => startRecognition("feedbacktext")}>
              {isListening ? "Listening..." : "Speak"}
            </button>
          </div>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      <Footer />
    </div>
  );
}

export default AddFeedback;