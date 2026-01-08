import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, OrderProduct } from "../services/productServices";
import "../css/product.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Address fields
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Error states
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("COD");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  // Show checkout popup
  const handleBuyNow = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to continue");
      navigate("/userLogin");
      return;
    }
    setShowCheckout(true);
  };

  // Validate fields
  const validateFields = () => {
    const newErrors = {};
    if (!houseNo.trim()) newErrors.houseNo = "House/Flat No is required";
    if (!street.trim()) newErrors.street = "Street/Area is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!district.trim()) newErrors.district = "District is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!pincode.trim() || !/^\d{6}$/.test(pincode))
      newErrors.pincode = "Enter valid 6-digit Pincode";
    if (payment === "UPI" && (!upiId.trim() || !upiId.includes("@")))
      newErrors.upi = "Enter valid UPI ID";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!validateFields()) return;

    const userId = localStorage.getItem("userId");
    const fullAddress = `${houseNo}, ${street}, ${city}, ${district}, ${state} - ${pincode}`;

    try {
      await OrderProduct(userId, product.id, fullAddress, payment);
      alert("✅ Order placed successfully!");
      setShowCheckout(false);
      navigate("/userdashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      {/* ===== PRODUCT CARD ===== */}
      <div className="product-detail-card">
        <img
          src={`http://localhost:8071${product.imageUrl}`}
          alt={product.name}
          className="product-detail-image"
        />
        <h2>{product.name}</h2>
        {product.brand && <p><b>Brand:</b> {product.brand}</p>}
        {product.category && <p><b>Category:</b> {product.category}</p>}
        <p><b>Price:</b> ₹{product.price}</p>
        {product.desc && <p><b>Description:</b> {product.desc}</p>}
        <p><b>Available:</b> {product.available ? "Yes" : "No"}</p>
        <p><b>Quantity:</b> {product.quantity}</p>

        <div className="product-buttons">
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {/* ===== CHECKOUT POPUP ===== */}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <h3>Checkout</h3>
            <div className="checkout-form">

              <div className="form-group">
                <label>House / Flat No</label>
                <input
                  type="text"
                  placeholder="Enter House / Flat No"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className={errors.houseNo ? "error-input" : ""}
                />
                {errors.houseNo && <p className="error-text">{errors.houseNo}</p>}
              </div>

              <div className="form-group">
                <label>Street / Area</label>
                <input
                  type="text"
                  placeholder="Street / Area"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={errors.street ? "error-input" : ""}
                />
                {errors.street && <p className="error-text">{errors.street}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={errors.city ? "error-input" : ""}
                  />
                  {errors.city && <p className="error-text">{errors.city}</p>}
                </div>

                <div className="form-group">
                  <label>District</label>
                  <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className={errors.district ? "error-input" : ""}
                  />
                  {errors.district && <p className="error-text">{errors.district}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={errors.state ? "error-input" : ""}
                  />
                  {errors.state && <p className="error-text">{errors.state}</p>}
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className={errors.pincode ? "error-input" : ""}
                  />
                  {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                </select>
              </div>

              {payment === "UPI" && (
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={errors.upi ? "error-input" : ""}
                  />
                  {errors.upi && <p className="error-text">{errors.upi}</p>}
                </div>
              )}

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
              <button className="close-btn" onClick={() => setShowCheckout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
