import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"; // You need Axios for making HTTP requests
import "../pages/feedback.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddFeedback() {
  const [feedback, setFeedback] = useState({
    feedbacktitle: "",
    feedbacktext: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback);
      alert("Feedback added successfully!");
      navigate("/feedback"); //redirect to all feedback
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the feedback.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Add Feedback</h1>
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
            onChange={handleChange}
          />
          <button type="button">Speak</button>
          </div>
        </div>
        <div className="input-container">
          <label>Feedback Text</label>
          <div className="input-with-button">
          <textarea
            id="feedbacktext"
            name="feedbacktext"
            onChange={handleChange}
          ></textarea>
          <button type="button">Speak</button>
          </div>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      <Footer />
    </div>
  );
}

export default AddFeedback;
