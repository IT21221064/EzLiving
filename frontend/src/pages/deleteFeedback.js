import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./feedbacklist.css";
import AdminNavbar from "../components/AdminNavbar";

function DeleteFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  // Define fetchFeedback function outside of useEffect
  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback"); // API endpoint for fetching feedback
      setFeedbackList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call fetchFeedback inside useEffect
    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      alert("A user's feedback deleted successfully!");
      // After deleting, fetch the updated feedback list
      fetchFeedback();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1 className="feedback-heading">User Feedbacks on our site</h1>
      <br />
      <br />
      <ul className="feedback-list">
        {feedbackList.map((feedback) => (
          <li key={feedback._id} className="feedback-item-box">
            <h2 className="feedback-title">{feedback.feedbacktitle}</h2>
            <p className="feedback-text">{feedback.feedbacktext}</p>
            <button className="feedback-delete-btn" onClick={() => handleDeleteFeedback(feedback._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default DeleteFeedback;
