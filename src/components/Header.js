import React from "react";
import logo from "../assets/logo.png"; // Add your logo image file to the 'assets' folder
import { useLocation } from "react-router-dom";
import './loginregisterbtn.css'

const Header = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/user-dashboard" || location.pathname === "/admin-dashboard";

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#bde0fe",
      borderBottom: "1px solid #ddd",
    }}>
      <div>
        <img src={logo} alt="Logo" style={{ height: "60px" }} />
      </div>
      <div style={{ fontSize: "3em", fontWeight: "bold" }}>Hotel 89</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {!isDashboard && (
          <>
            <button class="login" style={{ margin: "0 10px", padding: "5px 10px", cursor: "pointer" }} onClick={() => window.location.href = "/login"}>Login</button>
            <button class="login" style={{ margin: "0 10px", padding: "5px 10px", cursor: "pointer" }} onClick={() => window.location.href = "/register"}>Register</button>
          </>
        )}
        <div style={{ marginLeft: "20px" }}>
          {/* Add social links here */}
        </div>
      </div>
    </header>
  );
};

export default Header;