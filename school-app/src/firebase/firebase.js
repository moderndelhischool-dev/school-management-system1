import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMfa08eX40VS1yXFH3Zc-UzvQPzGNMsaM",
  authDomain: "school-app-53c74.firebaseapp.com",
  projectId: "school-app-53c74",
  storageBucket: "school-app-53c74.appspot.com", // ✅ MUST BE THIS
  messagingSenderId: "294101220471",
  appId: "1:294101220471:web:d8464ac18b1ec438aa1a72",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
