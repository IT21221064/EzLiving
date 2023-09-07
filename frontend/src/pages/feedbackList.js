import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feedbacklist.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

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
