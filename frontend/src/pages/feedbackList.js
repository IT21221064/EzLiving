import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState("");
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  console.log("type"+type);
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
           import("../pages/colorblinds/ReviewsList/tritanopiafeedbacklist.css");
          break;
        default:
           import("../pages/colorblinds/ReviewsList/feedbacklist.css");
          break;
      }
    };

    importCSSBasedOnType();
  }, [type]);

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
    async function fetchFeedback() {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback"); // API endpoint for fetching feedback
        setFeedbackList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFeedback();
  }, []);
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at feedback page");
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
      <h1 className="feedback-heading">User Feedbacks on our site</h1>
      <Link to="/AddFeedback" className="addfeedback-link">
        <button className="addfeedback-button">Add a Feedback</button>
      </Link>
      <ul className="feedback-list">
        {feedbackList.map((feedback) => (
          <li key={feedback._id} className="feedback-item-box">
            
              <h2 className="feedback-title">{feedback.feedbacktitle}</h2>
              <p className="feedback-text">{feedback.feedbacktext}</p>
            
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default FeedbackList;
