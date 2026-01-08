import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, searchProducts } from "../services/productServices";
import { getUserById } from "../services/UserService";
import NavBar from "../componants/NavBar";
import "../css/userDashboard.css";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
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
    </div>
  );
}

export default UserDashboard;
