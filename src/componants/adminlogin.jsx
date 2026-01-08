import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/AdminService";
import "../css/adminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(username, password);

      if (res.status === "success") {
        alert("Admin Login Successful ✅");
        localStorage.setItem("adminLoggedIn", true); // save login flag
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials ❌");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" autoComplete="off" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          required
          
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
