import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar({ user, setOpenPanel, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navKeyword, setNavKeyword] = useState("");
  const navigate = useNavigate();

  // Normal search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(navKeyword);
  };

  // Live search
  const handleLiveSearch = (e) => {
    const value = e.target.value;
    setNavKeyword(value);

    if (onSearch) onSearch(value);  // 🚀 Live search
  };

  return (
    <nav className="qn-navbar">

      <h1 className="qn-logo" 
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Quick<span>Now</span>
      </h1>

      {/* Mobile Search */}
      <form className="qn-mobile-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={navKeyword}
          onChange={handleLiveSearch}
        />
        <button type="submit" className="qn-mobile-search-btn">Search</button>
      </form>

      {/* Hamburger Menu */}
      <button
        className={`qn-hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      <div className={`qn-menu ${menuOpen ? "open" : ""}`}>
        {user ? (
          <button className="qn-login-btn" onClick={() => setOpenPanel?.(true)}>Profile</button>
        ) : (
          <button className="qn-login-btn" onClick={() => navigate("/userLogin")}>
            Login
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="qn-desktop-right">
        <form className="qn-dropdown-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={navKeyword}
            onChange={handleLiveSearch}
          />
          <button type="submit">Search</button>
        </form>

        {user ? (
          <button className="qn-login-btn" onClick={() => setOpenPanel?.(true)}>Profile</button>
        ) : (
          <button className="qn-login-btn" onClick={() => navigate("/userLogin")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
