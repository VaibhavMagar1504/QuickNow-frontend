import React, { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../services/productServices";
import { useParams } from "react-router-dom";
import "../css/updateProduct.css";

export default function UpdateProduct() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setFormData(data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = await updateProduct(id,formData);
      alert(msg);
    } catch (err) {
      alert("Error updating product ❌");
    }
  };

  return (
    <div className="updateproduct-container">
      <h2>Update Product</h2>
      <form className="updateproduct-form" onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="desc" value={formData.desc} onChange={handleChange} required />
        </label>

        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </label>

        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>

        <label>
          Release Date:
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
        </label>

        <label className="checkbox-label">
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Available
        </label>

        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
