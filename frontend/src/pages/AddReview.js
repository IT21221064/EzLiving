import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../pages/feedback.css';
import { Link } from "react-router-dom";

function AddReview() {
  const [review, setReview] = useState({
    reviewtitle: "",
    reviewtext: "",
  });
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/review", review);
      alert("Review added successfully!");
      navigate("/Review"); //redirect to all review
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the review.");
    }
  };
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at add review page");
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
      <h1>Add Review</h1>
      <Link to="/Review" className="feedback-link">
        <button className="link-button">View Reviews</button>
      </Link>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label>Review Title</label>
          <div className="input-with-button">
          <input
            type="text"
            id="reviewtitle"
            name="reviewtitle"
            onChange={handleChange}
          />
          <button type="button">Speak</button>
          </div>
        </div>
        <div className="input-container">
          <label>Review Text</label>
          <div className="input-with-button">
          <textarea
            id="reviewtext"
            name="reviewtext"
            onChange={handleChange}
          ></textarea>
          <button type="button">Speak</button>
          </div>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default AddReview;
