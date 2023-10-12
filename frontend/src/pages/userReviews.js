import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from '../hooks/useAuthContext';

function UserReviews() {
  const { user } = useAuthContext();
  const [userReviews, setUserReviews] = useState([]);
  const [uname, setUsername] = useState("");
  const [type, setType] = useState("");

  console.log("type"+type);
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/userReview/deuteranopiaUserreview.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/userReview/protanopiaUserreview.css");
          break;
        case "tritanopia":
           import("../pages/colorblinds/userReview/tritanopiaUserreview.css");
          break;
        default:
           import("../pages/colorblinds/userReview/userReview.css");
          break;
      }
    };

    importCSSBasedOnType();
  }, [type]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.userid}`);
        const json = await response.json();

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

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await axios.get("http://localhost:5000/api/review", {
          params: { uname }
        });
        setUserReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserReviews();
  }, [uname]);

  // Filter userReviews to show only reviews by the current user
  const userReviewsByCurrentUser = userReviews.filter((review) => review.username === uname);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`);
      // After successful deletion, you may want to update the userReviews state to remove the deleted review.
      setUserReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="user-reviews-container">
        <h1 className="feedback-heading">{uname}'s Reviews</h1>
        <ul className="user-reviews-list">
          {userReviewsByCurrentUser.map((review) => (
            <li className="user-review" key={review._id}>
              <h2>{review.reviewtitle}</h2>
              <p>{review.reviewtext}</p>
              <p>user: {review.username}</p>
              {review.username === uname && (
                <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
              )}
              <br/>
              <br/>
              <button>
                  <Link to={`/UpdateReview/${review._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Update Review
                   </Link>
            </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default UserReviews;
