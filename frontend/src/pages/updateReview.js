import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UpdateReview(){
  const { reviewId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function

  const [reviewData, setReviewData] = useState({
    reviewtitle: "",
    reviewtext: "",
  });

  useEffect(() => {
    async function fetchReview() {
      try {
        const response = await axios.get(`http://localhost:5000/api/review/${reviewId}`);
        setReviewData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReview();
  }, [reviewId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleUpdateReview = async () => {
    try {
      await axios.put(`http://localhost:5000/api/review/${reviewId}`, reviewData);
      navigate("/reviewList"); // Use navigate to redirect to the review list page after updating
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="feedback-heading">Update Review</h1>
      <div className="update-review-form">
        <div className="form-group">
          <label htmlFor="reviewtitle">Review Title</label>
          <input
            type="text"
            id="reviewtitle"
            name="reviewtitle"
            value={reviewData.reviewtitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewtext">Review Text</label>
          <textarea
            id="reviewtext"
            name="reviewtext"
            value={reviewData.reviewtext}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="update-button" onClick={handleUpdateReview}>
          Update Review
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateReview;
