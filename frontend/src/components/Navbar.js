import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    const lowercaseTranscript = transcript.toLowerCase();

    if (lowercaseTranscript.includes("go to home")) {
      navigate("/");
    } else if (lowercaseTranscript.includes("add item")) {
      navigate("/addItem");
    } else if (lowercaseTranscript.includes("go to items")) {
      navigate("/items");
    } else {
      // If none of the predefined commands match, treat the transcript as a search query
      setSearchQuery(transcript);
    }
  };

  recognition.onend = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search functionality here, e.g., navigate to a search results page
    // You can access the search query using the `searchQuery` state
  };

  const handleStartListening = () => {
    // Start listening for voice input only when the search button is clicked
    handleMicClick();
  };

  return (
    <div className="col-md-12 bg-dark py-3">
      <button className="mic-button" onClick={handleStartListening}>
        Start Listening
      </button>
      <nav className="navbar navbar-dark">
        <a className="navbar-brand" href={"/"}>
          Voice controlled navigation
        </a>
        <form onSubmit={handleSearchSubmit} className="form-inline">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-success"
                type="submit"
                // Start listening when the button is clicked
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/addItem">
              Add Item
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/viewItems">
              View Items
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
