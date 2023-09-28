import React, { useState } from "react";
import { useAdminLogin } from "../hooks/useAdminLogin";
import "./adminlogin.css"; // Import the CSS file

const AdminLogin = () => {
  const [username, setUser] = useState("");
  const [pw, setPW] = useState("");
  const { login, error, isLoading } = useAdminLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, pw);
  };

  return (
    <form className="alogcreate" onSubmit={handleSubmit}>
      <h3 className="alogh3">Admin Login</h3>

      <label className="aloglabel">Username:</label>
      <input
        type="text"
        className="aloginput"
        onChange={(e) => setUser(e.target.value)}
        value={username}
      />
      <label className="aloglabel">Password:</label>
      <input
        type="password"
        className="aloginput"
        onChange={(e) => setPW(e.target.value)}
        value={pw}
      />
      <br />

      <button className="alogbtnSubmit" disabled={isLoading}>
        Login
      </button>
      {error && <div className="alogerror">{error}</div>}
    </form>
  );
};

export default AdminLogin;
