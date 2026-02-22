import React, { useState } from "react";
import { addProduct } from "../services/productServices";
import { validateProductForm } from "../validation/addProductValidation";
import "../css/addProduct.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: true,
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [errors, setErrors] = useState({});

  // ------------------------------------------
  // 🔥 LIVE VALIDATION FOR ALL TEXT INPUTS
  // ------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedForm = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(updatedForm);

    // Run validation instantly
    const validationErrors = validateProductForm(updatedForm, image);
    setErrors(validationErrors);
  };

  // ------------------------------------------
  // 🔥 LIVE VALIDATION FOR IMAGE FILE
  // ------------------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) setPreview(URL.createObjectURL(file));

    const validationErrors = validateProductForm(formData, file);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProductForm(formData, image);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const data = new FormData();
    const productJson = JSON.stringify(formData);
    data.append("product", new Blob([productJson], { type: "application/json" }));
    if (image) data.append("imageFile", image);

    try {
      await addProduct(data);
      alert("✅ Product added successfully!");

      setFormData({
        name: "",
        desc: "",
        brand: "",
        price: "",
        category: "",
        releaseDate: "",
        available: true,
        quantity: "",
      });

      setImage(null);
      setPreview(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product!");
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} className="addproduct-form">
        
        {/* PRODUCT NAME */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter product description"
          />
          {errors.desc && <p className="error">{errors.desc}</p>}
        </div>

        {/* BRAND */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
          />
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* RELEASE DATE */}
        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
          {errors.releaseDate && <p className="error">{errors.releaseDate}</p>}
        </div>

        {/* AVAILABLE */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          <label>Available</label>
        </div>

        {/* QUANTITY */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>

        {/* IMAGE */}
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <button type="submit" className="submit-btn">➕ Add Product</button>
      </form>
    </div>
  );
}
