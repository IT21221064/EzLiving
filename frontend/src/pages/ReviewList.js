import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feedbacklist.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

function ReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const onVoiceSearch = (voiceQuery) => {
    const filtered = reviewList.filter((reviews) =>
    reviews.reviewtitle.toLowerCase().includes(voiceQuery.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const onTypingSearch = (typedQuery) => {
    const filtered = reviewList.filter((reviews) =>
    reviews.reviewtitle.toLowerCase().includes(typedQuery.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

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
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at review page");
         // Change the voice if needed
        window.speechSynthesis.speak(message);
        setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const renderedItems = filteredReviews.length > 0 ? filteredReviews : reviewList;

  return (
    <div>
      <Navbar/>
      <h1 className="feedback-heading">Review List</h1>
      <Searchbar
        onVoiceSearch={onVoiceSearch}
        onTypingSearch={onTypingSearch}
      />
      <Link to="/AddReview" className="feedback-link">
        <button className="link-button">Add Reviews</button>
      </Link>
      <ul className="feedback-list">
        {renderedItems.map((reviews) => (
          <li key={reviews._id} className="feedback-item-box">
            
              <h2 className="feedback-title">{reviews.reviewtitle}</h2>
              <p className="feedback-text">{reviews.reviewtext}</p>

              
            
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default ReviewList;
