import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/feedback.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddFeedback() {
  const [feedback, setFeedback] = useState({
    feedbacktitle: "",
    feedbacktext: "",
  });

  const [isListening, setIsListening] = useState(false);

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
      alert("Feedback added successfully!");
      navigate("/feedback");
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the feedback.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Tell us about what u feel about our website..</h1>
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