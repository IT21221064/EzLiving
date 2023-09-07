import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feedbacklist.css";
import { Link } from "react-router-dom";

function ReviewList() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    async function fetchReview() {
      try {
        const response = await axios.get("http://localhost:5000/api/review"); //API endpoint for fetching review
        setReviewList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReview();
  }, []);

  return (
    <div>
      <h1 className="feedback-heading">Review List</h1>
      <Link to="/AddReview" className="feedback-link">
        <button className="link-button">Add Reviews</button>
      </Link>
      <ul className="feedback-list">
        {reviewList.map((reviews) => (
          <li key={reviews._id} className="feedback-item-box">
            
              <h2 className="feedback-title">{reviews.reviewtitle}</h2>
              <p className="feedback-text">{reviews.reviewtext}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
