import React, { useState, useEffect } from "react";
import "./Searchbar.css";

function Searchbar() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleVoiceSearch();
    };

    recognition.onend = () => {
      if (!isListening) {
        recognition.start();
        setSearchQuery(transcript);
        handleVoiceSearch();
      }
    };
  }, [isListening]);

  const handleVoiceSearch = () => {
    if (!isListening) {
      setIsListening(true);
    }
    // Perform your search functionality here using the searchQuery state
    console.log("Performing search with query:", searchQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleVoiceSearch} className="search-button">
        Search by Voice
      </button>
    </div>
  );
}

export default Searchbar;
