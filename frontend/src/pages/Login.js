import React, { useState,useEffect } from "react";
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
import './login.css';

const UserLogin = () => {
  const { user } = useAuthContext;
  const [username, setUser] = useState('');
  const [pw, setPW] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(username, pw);

    
    if (user) { // Assuming `user` has an `id` property
      navigate("/items"); // Redirect to the "/items" page
    }
  }
  useEffect(() => {
    if (!hasSpokenWelcome) {
      // Wait for voices to be available
     
        const message = new SpeechSynthesisUtterance("now you are at log in page");
         // Change the voice if needed
        window.speechSynthesis.speak(message);
        setHasSpokenWelcome(true);
    
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [0]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="logintop">Login</h2>
        <div className="form-group">
          <br></br>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser(e.target.value)}
            value={username}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPW(e.target.value)}
            value={pw}
            placeholder="Enter your password"
          />
        </div>
        <p>Don't have an account? <a href="/Signup">Register here</a></p>
        <button className="btn-submit" disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default UserLogin;
