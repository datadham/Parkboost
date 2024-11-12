// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpdLuf-RWes4tcscE4U0VocyTWQNQGrrI",
  authDomain: "parky-a2e24.firebaseapp.com",
  projectId: "parky-a2e24",
  storageBucket: "parky-a2e24.appspot.com",
  messagingSenderId: "295118511735",
  appId: "1:295118511735:web:79a67242d01288c0ff3072",
  measurementId: "G-Y1RV9G2BWV",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analytics

// Export initialized services for use in the app
export { auth, db, analytics };
