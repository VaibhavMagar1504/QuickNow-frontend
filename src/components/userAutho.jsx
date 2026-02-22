import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/UserService";
import "../css/userAuth.css";
import { validateRegisterForm } from "../validation/userValidation"; // ONLY REGISTER VALIDATION

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ❌ NO VALIDATION ON LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // clear old errors

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      alert("✅ Login successful");
      navigate("/userdashboard");
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data?.message || "Try again"));
    }
  };

  // ✅ APPLY VALIDATION ONLY HERE
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await registerUser(formData);

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      alert("✅ Registered successfully");
      navigate("/userdashboard");
    } catch (err) {
      alert(
        "❌ Registration failed: " +
          (err.response?.data?.message || "Try again")
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isLogin ? (
          <form className="auth-form" autoComplete="off" onSubmit={handleLogin}>
            <h2 className="auth-title">User Login</h2>

            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button type="submit" className="auth-btn">Login</button>

            <p>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="toggle-link">
                Register
              </span>
            </p>
          </form>
        ) : (
         
          <form className="auth-form" autoComplete="off" onSubmit={handleRegister}>
            <h2 className="auth-title">Register</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}

            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <button type="submit" className="auth-btn">Register</button>

            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="toggle-link">
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
