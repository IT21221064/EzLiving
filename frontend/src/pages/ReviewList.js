import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

function ReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const { user } = useAuthContext();
  const [type, setType] = useState("");
  const [uname, setUsername] = useState("");
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  
  console.log("type"+type);
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/ReviewsList/deuteranopiafeedbacklist.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/ReviewsList/protanopiafeedbacklist.css");
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

  const renderedItems = filteredReviews.length > 0 ? filteredReviews : reviewList;

  return (
    <div>
      <Navbar/>
      
      <Searchbar
        onVoiceSearch={onVoiceSearch}
        onTypingSearch={onTypingSearch}
      />
      <Link to="/AddReview" className="feedback-link">
        <button className="link-buttonR">Add Reviews</button>
      </Link>
      <ul className="feedback-list">
        {renderedItems.map((reviews) => (
          <li key={reviews._id} className="feedback-item-box">
            
              <h2 className="feedback-title">{reviews.reviewtitle}</h2>
              <p className="feedback-text">{reviews.reviewtext}</p>
              <p className="feedback-textUser">User : {reviews.username}</p>

              
            
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default ReviewList;
