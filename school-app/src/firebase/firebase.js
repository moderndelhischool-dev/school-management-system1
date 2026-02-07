// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config (same as console)
const firebaseConfig = {
  apiKey: "AIzaSyDMfa08eX40VS1yXFH3Zc-UzvQPzGNMsaM",
  authDomain: "school-app-53c74.firebaseapp.com",
  projectId: "school-app-53c74",
  storageBucket: "school-app-53c74.firebasestorage.app",
  messagingSenderId: "294101220471",
  appId: "1:294101220471:web:d8464ac18b1ec438aa1a72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
