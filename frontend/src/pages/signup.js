import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [pw, setPW] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, NIC, email, username, pw, type };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        if (json.emptyFields) {
          setEmptyFields(json.emptyFields);
        }
      }

      if (response.ok) {
        setName("");
        setNIC("");
        setEmail("");
        setUser("");
        setPW("");
        setType("");
        setError(null);
        setEmptyFields([]);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(json));
        console.log("New user added");

        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      console.error("Error while registering:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
      const message = new SpeechSynthesisUtterance(
        "Now you are at the sign-up page"
      );
      // Change the voice if needed
      window.speechSynthesis.speak(message);
      setHasSpokenWelcome(true);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [0]);

  return (
    <div className="signpage">
      <div className="signcard">
        <h3 className="topic">User Registration</h3>
        <form className="signup" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes("name") ? "error" : ""}
          />
          <br />

          <label>NIC:</label>
          <input
            type="text"
            onChange={(e) => setNIC(e.target.value)}
            value={NIC}
            className={emptyFields.includes("NIC") ? "error" : ""}
          />
          <br />

          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes("email") ? "error" : ""}
          />
          <br />

          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={username}
            className={emptyFields.includes("username") ? "error" : ""}
          />
          <br />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPW(e.target.value)}
            value={pw}
            className={emptyFields.includes("pw") ? "error" : ""}
          />
          <br />

          <label>Type:</label>
          <br />
          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
            className={emptyFields.includes("type") ? "error" : ""}
          >
            <option value="">Select Type</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="protanopia">Protanopia</option>
            <option value="tritanopia">Tritanopia</option>
          </select>
          <br />

          <button className="btnSubmit" disabled={isLoading}>
            Register
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
