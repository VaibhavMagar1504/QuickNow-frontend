import React from "react";
import "../css/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If user is on another page, go home first then scroll
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-wrapper">

        <div className="footer-section about">
          <h2>
            Quick<span style={{ color: "#e67812ff" }}>Now</span>
          </h2>
          <p>
            Shop smarter with QuickNow. Find top products, best deals, and fast
            delivery—right at your fingertips!
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <span onClick={() => navigate("/")}>Home</span>
            </li>
            <li>
              <span onClick={() => navigate("/products")}>Products</span>
            </li>
            <li>
              <span onClick={() => navigate("/about")}>About Us</span>
            </li>
            <li>
              <span onClick={scrollToContact}>Contact</span>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: support@quicknow.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>

      </div>

      <div className="footer-social">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>

      <div className="footer-bottom">
        <p>© 2025 QuickNow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;