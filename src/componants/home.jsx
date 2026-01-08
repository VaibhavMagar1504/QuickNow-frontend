import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { getAllProducts, searchProducts } from "../services/productServices";
import heroImage from "../assets/Shop.jpg";
import NavBar from "../componants/NavBar";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // 🔥 This handles NavBar search
  const handleSearch = async (keywordFromNav) => {
    if (!keywordFromNav || keywordFromNav.trim() === "") {
      fetchProducts();
      return;
    }

    try {
      const data = await searchProducts(keywordFromNav);
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  const handleBuyNow = () => navigate("/userLogin");
  const handleLogin = () => navigate("/userLogin");

  return (
    <div className="home-container">

      {/* Pass search function to NavBar */}
      <NavBar onSearch={handleSearch} />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Shop Smarter with <span>QuickNow</span>
          </h1>
          <p>
            Discover the latest products at unbeatable prices. Fast delivery,
            trusted sellers, and top deals every day.
          </p>
          <div className="hero-buttons">
            <button onClick={handleLogin}>Start Shopping</button>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Shopping Illustration" />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <h2 className="section-title">Featured Products</h2>

      <div className="products">
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">

              {product.imageUrl ? (
                <img
                  src={`http://localhost:8071${product.imageUrl}`}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/250x200?text=No+Image"
                  alt="No Image"
                  className="product-image"
                />
              )}

              <h3>{product.name}</h3>

              {product.brand && (
                <p><b>Brand:</b> {product.brand}</p>
              )}
              {product.category && (
                <p><b>Category:</b> {product.category}</p>
              )}

              <p><b>Price:</b> ₹{product.price}</p>

              {product.desc && <p>{product.desc}</p>}

              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          ))
        )}
      </div>

          <footer className="footer">
  <div className="footer-wrapper">
    {/* About / Logo */}
    <div className="footer-section about">
      <h2>Quick<span style={{color: "#e67812ff"}}>Now</span></h2>
      <p>Shop smarter with QuickNow. Find top products, best deals, and fast delivery—right at your fingertips!</p>
    </div>

    {/* Quick Links */}
    <div className="footer-section links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div className="footer-section contact">
      <h3>Contact</h3>
      <p>Email: support@quicknow.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Address: 123 Quick Street, Mumbai, Maharashtra, India</p>
    </div>
  </div>

  {/* Social */}
 <div className="footer-social">
  <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
  <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
  <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
  <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
</div>


  <div className="footer-bottom">
    <p>© 2025 QuickNow. All rights reserved.</p>
  </div>
</footer>

    
    </div>
  );
}

export default HomePage;
