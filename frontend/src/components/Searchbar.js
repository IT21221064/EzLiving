// Searchbar.js
import React, { useState, useEffect } from "react";
import "./Searchbar.css";

function Searchbar({ onVoiceSearch, onTypingSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      transcript = transcript.replace(/\./g, "");
      setSearchQuery(transcript);
      // Trigger the voice search when recognition is successful
      onVoiceSearch(transcript);
    };

    // Start recognition when component mounts if isListening is true
    if (isListening) {
      recognition.start();
    }

    // Cleanup: Stop recognition when the component unmounts
    return () => {
      recognition.stop();
    };
  }, [isListening, onVoiceSearch]);

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
  };

  const handleTypingSearch = (event) => {
    const typedQuery = event.target.value;
    setSearchQuery(typedQuery);
    onTypingSearch(typedQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by Voice"
        value={searchQuery}
        onChange={handleTypingSearch}
      />
      <button onClick={handleVoiceSearch} className="search-button">
        {isListening ? "Stop Listening" : "Search"}
      </button>
    </div>
  );
}

export default Searchbar;
