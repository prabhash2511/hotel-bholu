import React, { useEffect, useState } from "react";
import userImage from "../assets/user.png"; // Add a default user image to the 'assets' folder
import { auth, db } from "../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import starter1 from "../assets/starter/starter1.gif";
import starter2 from "../assets/starter/starter2.gif";
import starter3 from "../assets/starter/starter3.gif";
import main1 from "../assets/main/main1.gif";
import main2 from "../assets/main/main2.gif";
import main3 from "../assets/main/main3.gif";
import des1 from "../assets/des/des1.gif";
import des2 from "../assets/des/des2.gif";
import des3 from "../assets/des/des3.gif";







const UserDashboard = () => {
  const [userName, setUserName] = useState("User");
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleAddItem = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      alert("Please select a table number.");
      return;
    }

    const orderData = {
      tableNumber,
      items: orderItems,
      total: calculateTotal(),
      userName,
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      alert("Order placed successfully!");
      setOrderItems([]);
      setTableNumber("");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Ribbon Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "20px",
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={userImage}
            alt="User"
            style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <h2>Welcome, {userName}!</h2>
        </div>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>Logout</button>
      </div>

      {/* Menu Card Container */}
      <div style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fafafa",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}>
          {/* Starter Section */}
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h3>Starters</h3>
            <div style={{ margin: "10px 0" }}>
              <img src={starter1} alt="Starter 1" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 1 - ₹5.99 <button onClick={() => handleAddItem({ name: "Starter 1", price: 5.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={starter2} alt="Starter 2" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 2 - ₹6.99 <button onClick={() => handleAddItem({ name: "Starter 2", price: 6.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={starter3} alt="Starter 3" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 3 - ₹4.99 <button onClick={() => handleAddItem({ name: "Starter 3", price: 4.99 })}>Add</button></p>
            </div>
          </div>

          {/* Main Course Section */}
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h3>Main Course</h3>
            <div style={{ margin: "10px 0" }}>
              <img src={main1} alt="Main 1" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 1 - ₹10.99 <button onClick={() => handleAddItem({ name: "Main 1", price: 10.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={main2} alt="Main 2" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 2 - ₹12.99 <button onClick={() => handleAddItem({ name: "Main 2", price: 12.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={main3} alt="Main 3" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 3 - ₹9.99 <button onClick={() => handleAddItem({ name: "Main 3", price: 9.99 })}>Add</button></p>
            </div>
          </div>

          {/* Desserts Section */}
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
            <h3>Desserts</h3>
            <div style={{ margin: "10px 0" }}>
              <img src={des1} alt="Dessert 1" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 1 - ₹3.99 <button onClick={() => handleAddItem({ name: "Dessert 1", price: 3.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={des2} alt="Dessert 2" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 2 - ₹4.99 <button onClick={() => handleAddItem({ name: "Dessert 2", price: 4.99 })}>Add</button></p>
            </div>
            <div style={{ margin: "10px 0" }}>
              <img src={des3} alt="Dessert 3" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <p>Item 3 - ₹2.99 <button onClick={() => handleAddItem({ name: "Dessert 3", price: 2.99 })}>Add</button></p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Order Section */}
      <div style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}>
        <h3>Total Order</h3>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>{item.name} - ₹{item.price.toFixed(2)}</li>
          ))}
        </ul>
        <h4>Total: ₹{calculateTotal()}</h4>

        <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}>
          <option value="" disabled>Select Table Number</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>Table {num}</option>
          ))}
        </select>

          <br></br>
        <button onClick={handlePlaceOrder} style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer" }}>Place Order</button>
      </div>
    </div>
  );
};

export default UserDashboard;