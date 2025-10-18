// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-a28R06901pgT6tJNthoAyC59viifr6A",
  authDomain: "example-1e559.firebaseapp.com",
  projectId: "example-1e559",
  storageBucket: "example-1e559.firebasestorage.app",
  messagingSenderId: "335510105365",
  appId: "1:335510105365:web:50b82cb686b79213480d1c",
  measurementId: "G-6G4QQ5E6XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Create auth instance linked to app
const auth = getAuth(app);

// ✅ Create provider instance
const provider = new GoogleAuthProvider();

// ✅ Export everything properly
export {
  app,
  auth,                  // ✅ this is the correct one to use
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider
};
