// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBlR-w1Tpgnl12QpkNMsyTufZgnLbjpn6w",
  authDomain: "hotel89-bholu.firebaseapp.com",
  projectId: "hotel89-bholu",
  storageBucket: "hotel89-bholu.firebasestorage.app",
  messagingSenderId: "846594894920",
  appId: "1:846594894920:web:7e367c17ae9467e3d33c7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
