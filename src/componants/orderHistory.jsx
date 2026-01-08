import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../componants/NavBar";
import { GetUserOrders } from "../services/productServices";
import "../css/orderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/userLogin");
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await GetUserOrders(user.id);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    loadOrders();
  }, [user, navigate]);

  return (
    <div className="ohx-container">
      {/* NAVBAR */}
      <NavBar user={user} setOpenPanel={setOpenPanel} />

      {/* PROFILE SLIDE PANEL */}
      <div className={`ohx-profile-panel ${openPanel ? "open" : ""}`}>
        <button className="ohx-close-btn" onClick={() => setOpenPanel(false)}>×</button>
        <h2>User Profile</h2>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Mobile:</b> {user?.mobile}</p>

        <hr />

        <button className="ohx-panel-btn" onClick={() => navigate("/userProfile")}>
          Update Profile
        </button>
        <button className="ohx-panel-btn" onClick={() => navigate("/userDashboard")}>
          Dashboard
        </button>
        <button
          className="ohx-panel-btn ohx-logout"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="ohx-content">
        <h2 className="ohx-title">Order History</h2>
        
        <button
          className="ohx-panel-btn"
          style={{ marginBottom: "20px", width: "120px" }}
          onClick={() => navigate("/userDashboard")}
        >
          ← Back
        </button>

        {orders.length === 0 ? (
          <p className="ohx-no-orders">No Orders Found!</p>
        ) : (
          <div className="ohx-grid">
            {orders.map(order => (
              <div key={order.orderId} className="ohx-card">
                <img
                  src={`http://localhost:8071${order.imageUrl}`}
                  alt={order.productName}
                  className="ohx-card-img"
                />
                <div className="ohx-info">
                  <h6 className="ohx-name">{order.productName}</h6>
                  <p className="ohx-price">₹{order.price}</p>
                  <p><b>Status:</b> {order.status}</p>
                  <p><b>Order Date:</b> {order.createAt ? new Date(order.createAt).toLocaleDateString() : ""}</p>
                  {order.address && <p><b>Address:</b> {order.address}</p>}
                  {order.mobile && <p><b>Mobile:</b> {order.mobile}</p>}
                  {order.paymentMethod && <p><b>Payment:</b> {order.paymentMethod}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
