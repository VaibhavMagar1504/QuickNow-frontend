import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/UserService";
import "../css/UpdateProfile.css";
import NavBar from "./NavBar";

function UpdaterProfile() {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        navigate("/userLogin");
        return;
      }

      try {
        const res = await getUserById(storedUserId);
        setUser({
          id: res.data.id,
          name: res.data.name,
          mobile: res.data.mobile,
          address: res.data.address,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!user.name.trim()) tempErrors.name = "Name is required";
    if (!user.mobile.trim()) tempErrors.mobile = "Mobile number is required";
    if (!user.address.trim()) tempErrors.address = "Address is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const updatedData = { name: user.name, mobile: user.mobile, address: user.address };
      await updateUser(user.id, updatedData);

      alert("✅ Profile updated successfully");
      navigate("/userDashboard");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="up-container">

        <NavBar />

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="up-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile"
          value={user.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={user.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error-text">{errors.address}</p>}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdaterProfile;
