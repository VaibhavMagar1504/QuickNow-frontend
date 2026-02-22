import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/productServices";
import "../css/viewOrder.css";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const message = await updateOrderStatus(orderId, status);
      alert(message);
      loadOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Product</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.orderId}>
                  <td data-label="Order ID">{o.orderId}</td>
                  <td data-label="User">{o.userName}</td>
                  <td data-label="Mobile">{o.mobile}</td>
                  <td data-label="Address">{o.address}</td>
                  <td data-label="Product">{o.productName}</td>
                  <td data-label="Price">₹{o.price}</td>
                  <td data-label="paymet Method">{o.paymentMethod}</td>
                  <td data-label="Status">{o.status}</td>
                  <td data-label="Date">
                    {o.createAt ? new Date(o.createAt).toLocaleString() : ""}
                  </td>
                  <td data-label="Action">
                    {o.status === "PENDING" ? (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleStatusChange(o.orderId, "ACCEPTED")}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusChange(o.orderId, "REJECTED")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`status-${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
