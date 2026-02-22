import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { getAllProducts, searchProducts } from "../services/productServices";
import heroImage from "../assets/shoping1.png";
import NavBar from "../componants/NavBar";
import CategoryProduct from "../componants/CategoryProduct";
import Contact from "../componants/Contact";
import Footer from "../componants/Footer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("NEW");
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
      {/* NAVBAR */}
     <NavBar onSearch={handleSearch} hideSearch />


      {/* HERO SECTION */}
      <section className="hero-new">
        <div className="hero-new-left">
          <h1>
            Online Shopping <br />
            Made <span>Easy</span>
          </h1>

          <p>
            Fashion, electronics, and accessories — all in one place. Trusted
            sellers. Fast delivery.
          </p>

          <button className="hero-cta" onClick={handleLogin}>
            Start Shopping
          </button>
        </div>

        <div className="hero-new-right">
          <img src={heroImage} alt="Shopping Illustration" />
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="category-strip">
        <div
          className={`category-item ${activeCategory === "NEW" ? "active" : ""}`}
          onClick={() => setActiveCategory("NEW")}
        >
          <i className="fas fa-bolt"></i>
          <span>New Arrivals</span>
        </div>

        <div
          className={`category-item ${activeCategory === "MEN" ? "active" : ""}`}
          onClick={() => setActiveCategory("MEN")}
        >
          <i className="fas fa-male"></i>
          <span>Men's Wear</span>
        </div>

        <div
          className={`category-item ${activeCategory === "WOMEN" ? "active" : ""}`}
          onClick={() => setActiveCategory("WOMEN")}
        >
          <i className="fas fa-female"></i>
          <span>Women's Wear</span>
        </div>

        <div
          className={`category-item ${activeCategory === "ELECTRONICS" ? "active" : ""}`}
          onClick={() => setActiveCategory("ELECTRONICS")}
        >
          <i className="fas fa-mobile-alt"></i>
          <span>Electronics</span>
        </div>
      </section>

      {/* STATIC SUB-CATEGORY SECTION */}
      <CategoryProduct category={activeCategory} />

      {/* FEATURED PRODUCTS (ONLY WHEN NO CATEGORY SELECTED) */}
      {!activeCategory && (
        <>
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
                    <p>
                      <b>Brand:</b> {product.brand}
                    </p>
                  )}

                  {product.category && (
                    <p>
                      <b>Category:</b> {product.category}
                    </p>
                  )}

                  <p>
                    <b>Price:</b> ₹{product.price}
                  </p>

                  {product.desc && <p>{product.desc}</p>}

                  <button onClick={handleBuyNow}>Buy Now</button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
