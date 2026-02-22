import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import ProductDetail from "./components/product";
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./components/AdminDashBord";
import AddProduct from "./components/addProduct";
import ViewProducts from "./components/ViewAllProduct";
import UpdateProduct from "./components/updateProduct";
import LoginRegister from "./components/userAutho";
import UserDashboard from "./components/userDashbord";
import OrderHistory from "./components/orderHistory";
import UpdaterProfile from "./components/UpdateProfile";


function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/viewAllProduct" element={<ViewProducts />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/userLogin" element={<LoginRegister />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/updateProfile" element={<UpdaterProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
