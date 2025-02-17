import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
// import './AddItem.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    // Predefined admin credentials
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (

    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <h1>Login</h1>
      <div class="title">Welcome,<br></br><span>login to continue</span></div>
      <input 
        class="input"
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <br />
      <input
        class="input"
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <br />
      <button class="button-confirm" onClick={handleLogin}>Login</button>

      





    </div>
  );
};

export default Login;
