import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const { email, password, name, phone, username } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        username,
      });

      alert("Registration successful!");
      setFormData({ name: "", email: "", phone: "", username: "", password: "" });
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", }}>
      <h1>Register</h1>
      <div class="title">Register,<br></br><span>to continue</span></div>
      <input class="input" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <br />
      <input class="input" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <br />
      <input class="input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <br />
      <input class="input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <br />
      <input class="input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <br />
      <button class="button-confirm" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
