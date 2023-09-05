import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateFeedback() {
  const [feedbackData, setFeedbackData] = useState({
    feedbacktitle: "",
    feedbacktext: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/feedback" + _id, feedbackData);
      alert("Feedback updated");
      // Optionally, you can reset the form or perform any other actions after a successful update.
    } catch (err) {
      console.error(err);
    }
  };

  const { _id } = useParams();
  useEffect(() => {
    // Fetch the existing feedback data based on feedback ID when the component loads
    try {
      axios
        .get("http://localhost:5000/api/getFeedback/" + _id)
        // Update the 'feedbackData' state with the retrieved data
        .then((res) => {
          setFeedbackData({
            feedbacktitle: res.data.feedbacktitle,
            feedbacktext: res.data.feedbacktext,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h2>Update Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Feedback Title</label>
        <input
          type="text"
          name="feedbacktitle"
          value={feedbackData.feedbacktitle}
          onChange={(e) => setFeedbackData({ ...feedbackData, feedbacktitle: e.target.value })}
        />
        <label>Feedback Text</label>
        <textarea
          name="feedbacktext"
          value={feedbackData.feedbacktext}
          onChange={(e) => setFeedbackData({ ...feedbackData, feedbacktext: e.target.value })}
        ></textarea>
        <button type="submit">Update Feedback</button>
      </form>
    </div>
  );
}

export default UpdateFeedback;
