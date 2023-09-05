import React, { useState } from "react";
import axios from "axios"; // You need Axios for making HTTP requests
import "../pages/feedback.css"; // Import your CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState({
    feedbacktitle: "",
    feedbacktext: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("feedbacktitle", feedbackData.feedbacktitle);
    formData.append("feedbacktext", feedbackData.feedbacktext);

    try {
      // Make a POST request to your backend API to add the review
      const response = await axios.post("/addFeedback", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });

      if (response.status === 201) {
        // Successful submission
        alert("Feedback added successfully!");
        // You can redirect to another page or clear the form here
      } else {
        // Handle other status codes or errors
        alert("Failed to add the feedback.");
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
      alert("An error occurred while adding the feedback.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Add Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedbacktitle">Feedback Title:</label>
          <input
            type="text"
            id="feedbacktitle"
            name="feedbacktitle"
            value={feedbackData.feedbacktitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="feedbacktext">Feedback Text:</label>
          <textarea
            id="feedbacktext"
            name="feedbacktext"
            value={feedbackData.feedbacktext}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
