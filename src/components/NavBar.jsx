import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar({ user, setOpenPanel, onSearch, hideSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navKeyword, setNavKeyword] = useState("");
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(navKeyword);
  };

  const handleLiveSearch = (e) => {
    const value = e.target.value;
    setNavKeyword(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="qn-navbar">
      {/* LOGO */}
      <h1
        className="qn-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Quick<span>Now</span>
      </h1>

      {/* MOBILE SEARCH (HIDDEN ON HOME) */}
      {!hideSearch && (
        <form className="qn-mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            value={navKeyword}
            onChange={handleLiveSearch}
          />
        </form>
      )}

      {/* HAMBURGER */}
      <button
        className={`qn-hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MOBILE MENU */}
      <div className={`qn-menu ${menuOpen ? "open" : ""}`}>
        {user ? (
          <button className="qn-login-btn" onClick={() => setOpenPanel?.(true)}>
            Profile
          </button>
        ) : (
          <>
            <button
              className="qn-login-btn"
              onClick={() => setShowLoginOptions(!showLoginOptions)}
            >
              Login
            </button>

            {showLoginOptions && (
              <div className="qn-login-options">
                <button onClick={() => navigate("/adminLogin")}>
                  Admin Login
                </button>
                <button onClick={() => navigate("/userLogin")}>
                  User Login
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* DESKTOP RIGHT */}
      <div className="qn-desktop-right">
        {/* DESKTOP SEARCH (HIDDEN ON HOME) */}
        {!hideSearch && (
          <form className="qn-dropdown-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={navKeyword}
              onChange={handleLiveSearch}
            />
            <button type="submit">Search</button>
          </form>
        )}

        {user ? (
          <button className="qn-login-btn" onClick={() => setOpenPanel?.(true)}>
            Profile
          </button>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              className="qn-login-btn"
              onClick={() => setShowLoginOptions(!showLoginOptions)}
            >
              Login
            </button>

            {showLoginOptions && (
              <div className="qn-login-options">
                <button onClick={() => navigate("/adminLogin")}>
                  Admin Login
                </button>
                <button onClick={() => navigate("/userLogin")}>
                  User Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
