import React, { useState } from "react";
import "../css/admindashboard.css";

import AddProduct from "../componants/addProduct";
import ViewAllProducts from "../componants/ViewAllProduct";
import ViewOrders from "../componants/viewOrder";
import ShowUsers from "../componants/showUser";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "addProduct":
        return <AddProduct />;
      case "viewProducts":
        return <ViewAllProducts />;
      case "viewOrders":
        return <ViewOrders />;
      case "viewUsers":
        return <ShowUsers/>;
      default:
        return (
          <div className="welcome-box">
            <h2>
              Welcome to <span className="brand">QuickNow</span> Admin Dashboard 👋
            </h2>
            <p>Manage your store, products, and orders efficiently from one place.</p>
          </div>
        );
    }
  };

  const handleLogout = () => {
    alert("Logged out ✅");
    window.location.href = "/";
  };

  return (
    <div className="admindashboard-container">
      <nav className="admindashboard-navbar">
        <div className="admindashboard-logo">
          Quick<span className="headingspan">Now</span>
        </div>

        <div className={`admindashboard-links ${menuOpen ? "open" : ""}`}>
          <span
            className={activePage === "addProduct" ? "active" : ""}
            onClick={() => {
              setActivePage("addProduct");
              setMenuOpen(false);
            }}
          >
            ➕ Add Product
          </span>
          <span
            className={activePage === "viewProducts" ? "active" : ""}
            onClick={() => {
              setActivePage("viewProducts");
              setMenuOpen(false);
            }}
          >
            📦 View Products
          </span>
          <span
            className={activePage === "viewOrders" ? "active" : ""}
            onClick={() => {
              setActivePage("viewOrders");
              setMenuOpen(false);
            }}
          >
            🛒 View Orders
          </span>
          <span
            className={activePage === "viewUsers" ? "active" : ""}
            onClick={() => {
              setActivePage("viewUsers");
              setMenuOpen(false);
            }}
          >
            👤 View Users
          </span>

          <button className="admindashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>

      <main className="admindashboard-content">{renderPage()}</main>
    </div>
  );
}
