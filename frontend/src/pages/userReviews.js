import React, { useState, useEffect } from "react";
import axios from "axios";
//import '../pages/feedback.css';
import "../pages/userReview.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from '../hooks/useAuthContext';

function UserReviews() {
  const { user } = useAuthContext()
  const [userReviews, setUserReviews] = useState([]);
  const [uname, setUsername] = useState(""); 

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.userid}`);
        const json = await response.json();

        if (response.ok) {
          setUsername(json.username);
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

  return (
    <div>
      <Navbar/>
      <h1 className="user-reviews-container"></h1>
      <h1 className="feedback-heading">{uname}'s Reviews</h1>
      <ul className="user-reviews-list">
        {userReviewsByCurrentUser.map((review) => (
          <li className="user-review" key={review._id}>
            <h2>{review.reviewtitle}</h2>
            <p>{review.reviewtext}</p>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default UserReviews;
