import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2';

function UpdateReview() {
  const { user } = useAuthContext();
  const [uname, setUsername] = useState("");
  const [type, setType] = useState("");
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const [review, setReview] = useState({
    reviewtitle: "",
    reviewtext: "",
    reviewimage: "", // Include the reviewimage field
  });

  console.log("type"+type);
  useEffect(() => {
    const importCSSBasedOnType = async () => {
      switch (type) {
        case "deuteranopia":
           import("../pages/colorblinds/updateReview/deuteranopiaupdateR.css");
          break;
        case "protanopia":
           import("../pages/colorblinds/updateReview/protanopiaupdateR.css");
          break;
        case "tritanopia":
           import("../pages/colorblinds/updateReview/tritanopiaupdateR.css");
          break;
        default:
           import("../pages/colorblinds/updateReview/updatereview.css");
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/review/" + _id, review);
      Swal.fire({
        icon: 'success',
        title: 'Review Updated',
        text: 'Your Review successfully updated',
      });
      navigate("/userreview"); 
    } catch (err) {
      console.error(err);
    }
  };

  const { _id } = useParams();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/review/" + _id)
        
        .then((res) => {
          setReview({
            ...review,
            reviewtitle: res.data.reviewtitle,
            reviewtext: res.data.reviewtext,
            reviewimage: res.data.reviewimage,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
      const message = new SpeechSynthesisUtterance("Now you are at the update Review page");
      // Change the voice if needed
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [0]);

  //old
  return (
    <div>
      <Navbar />
      <div className="update-review-title">
        <h2>Update Your Review</h2>
      </div>
      <div className="update-review-form-container">
        <form onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input
            type="text"
            name="reviewtitle"
            value={review.reviewtitle}
            onChange={(e) => setReview({ ...review, reviewtitle: e.target.value })}
          />
          <label>Review Text</label>
          <textarea
            name="reviewtext"
            value={review.reviewtext}
            onChange={(e) => setReview({ ...review, reviewtext: e.target.value })}
          ></textarea>
          <button type="submit" className="update-buttonU">Update Review</button>
        </form>
      </div>
      <Footer />
    </div>
  );
  
}

export default UpdateReview;
