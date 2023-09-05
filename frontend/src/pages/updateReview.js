import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateReview() {
  const [reviewData, setReviewData] = useState({
    reviewtitle: "",
    reviewtext: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/review" + _id, reviewData);
      alert("Review updated");
      // Optionally, you can reset the form or perform any other actions after a successful update.
    } catch (err) {
      console.error(err);
    }
  };

  const { _id } = useParams();
  useEffect(() => {
    // Fetch the existing review data based on review ID when the component loads
    try {
      axios
        .get("http://localhost:5000/api/getReview/" + _id)
        // Update the 'reviewData' state with the retrieved data
        .then((res) => {
          setReviewData({
            reviewtitle: res.data.reviewtitle,
            reviewtext: res.data.reviewtext,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h2>Update Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Review Title</label>
        <input
          type="text"
          name="reviewtitle"
          value={reviewData.reviewtitle}
          onChange={(e) => setReviewData({ ...reviewData, reviewtitle: e.target.value })}
        />
        <label>Review Text</label>
        <textarea
          name="reviewtext"
          value={reviewData.reviewtext}
          onChange={(e) => setReviewData({ ...reviewData, reviewtext: e.target.value })}
        ></textarea>
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
}

export default UpdateReview;