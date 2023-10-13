import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';

function AddReview() {
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState(""); 
  const [review, setReview] = useState({
    reviewtitle: "",
    reviewtext: "",
  });
  const [isListening, setIsListening] = useState(false);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

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

  useEffect(() => {
    async function fetchreview() {
      try {
        const response = await axios.get("http://localhost:5000/api/review", {
          params: { uname } 
        });
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchreview();
  }, [uname]);

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
      setReview({ ...review, [field]: transcript });
      setActiveField(null);
      setIsListening(false);
      recognition.stop();
    };
  };

  const [activeField, setActiveField] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit button clicked");
    if (!review.reviewtitle || !review.reviewtext) {
      alert("Please fill in all the fields");
      return; // Don't proceed with the submission
    }
    try {
      // Include the username in the review object
      const reviewWithUsername = { ...review, username: uname };
      await axios.post("http://localhost:5000/api/review", reviewWithUsername);
      Swal.fire({
        icon: 'success',
        title: 'Review added',
        text: 'The Review has successfully added',
      });
      navigate("/Review"); // Redirect to all reviews
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
      const message = new SpeechSynthesisUtterance("Now you are at the Add Review page");
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
      <Navbar/>
      <h1 className="feedback-heading">Leave a Review</h1>
      <Link to="/Review" className="feedback-link">
        <button className="link-button">View Reviews</button>
      </Link>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label>Item Name</label>
          <div className="input-with-button">
            <input
              type="text"
              id="reviewtitle"
              name="reviewtitle"
              value={review.reviewtitle}
              onChange={handleChange}
            />
            <button type="button" onClick={() => startRecognition("reviewtitle")}>
            {isListening ? "Listening..." : "Speak"}
        </button>
          </div>
        </div>
        <div className="input-container">
          <label>Review Text</label>
          <div className="input-with-button">
            <textarea
              id="reviewtext"
              name="reviewtext"
              value={review.reviewtext}
              onChange={handleChange}
            ></textarea>
            <button type="button" onClick={() => startRecognition("reviewtext")}>
              {isListening ? "Listening..." : "Speak"}
            </button>
          </div>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <Footer/>
    </div>
  );
}

export default AddReview;
