import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct, searchProducts } from "../services/productServices";
import { useNavigate } from "react-router-dom";
import "../css/viewAllProduct.css";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(""); // Search keyword
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Live search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword.trim() === "") {
        fetchProducts();
      } else {
        searchProducts(keyword)
          .then((data) => setProducts(data))
          .catch((err) => console.error(err));
      }
    }, 300); // 300ms delay for debounce

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("✅ Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        alert("❌ Error deleting product!");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      searchProducts(keyword)
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    } else {
      fetchProducts();
    }
  };

  return (
    <div className="viewproducts-container">
      <h2>All Products</h2>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name, brand, or category..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Available</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8">No products available</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td>{p.available ? "Yes" : "No"}</td>
                    <td>{p.quantity}</td>
                    <td>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(p.id)}
                      >
                        ✏️ Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
