import React, { useEffect, useState } from "react";
import userImage from "../assets/user.png";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("Order marked as complete!");
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Ribbon Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={userImage}
            alt="Admin"
            style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <h2>Admin Dashboard</h2>
        </div>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* Orders Section */}
      <div
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        <h3>Pending Orders</h3>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <p><strong>Table:</strong> {order.tableNumber}</p>
                  <p><strong>User:</strong> {order.userName || "Unknown"}</p>
                  <p><strong>Items:</strong></p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} - ₹{item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                </div>
                <button
                  onClick={() => handleCompleteOrder(order.id)}
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
