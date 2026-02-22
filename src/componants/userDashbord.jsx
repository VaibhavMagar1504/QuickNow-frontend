import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, searchProducts } from "../services/productServices";
import { getUserById } from "../services/UserService";
import NavBar from "../componants/NavBar";
import "../css/userDashboard.css";
import CategoryProduct from "../componants/CategoryProduct";
import Footer from "../componants/Footer";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
   const [activeCategory, setActiveCategory] = useState("NEW");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        navigate("/userLogin");
        return;
      }

      try {
        const res = await getUserById(storedUserId);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        await fetchProducts();
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/userLogin");
      }
    };

    checkUser();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // UPDATED → receives keyword directly (from NavBar)
  const handleSearch = async (keyword) => {
    if (!keyword || !keyword.trim()) {
      fetchProducts();
      return;
    }

    try {
      const data = await searchProducts(keyword);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error searching:", err);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="ud-container">
      {/* NAVBAR WITH LIVE SEARCH SUPPORT */}
      <NavBar
        user={user}
        setOpenPanel={setOpenPanel}
        onSearch={handleSearch}
      />

      {/* PROFILE PANEL */}
      <div className={`profile-panel ${openPanel ? "open" : ""}`}>
        <button className="profile-close-btn" onClick={() => setOpenPanel(false)}>×</button>
        <h2>User Profile</h2>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Mobile:</b> {user?.mobile}</p>
        <p><b>Address:</b> {user?.address}</p>
        <hr />
        <button className="profile-panel-btn" onClick={() => navigate("/updateProfile")}>Update Profile</button>
        <button className="profile-panel-btn" onClick={() => navigate("/orderHistory")}>Order History</button>
        <button className="profile-panel-btn logout" onClick={handleLogout}>Logout</button>
      </div>

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

      {/* PRODUCT LIST */}
      <h2 className="ud-title">All Products</h2>
      <div className="ud-products">
        {products.map((product) => (
          <div key={product.id} className="ud-product-card" onClick={() => handleProductClick(product)}>
            <img
              src={`http://localhost:8071${product.imageUrl}`}
              alt={product.name}
              className="ud-product-image"
            />
            <h3>{product.name}</h3>
            <p><b>Price:</b> ₹{product.price}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;
