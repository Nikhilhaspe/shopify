import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOaZrlOnrCqPuaeo5PppFsZ_tUfAi-1GE",
  authDomain: "shopify-e212e.firebaseapp.com",
  projectId: "shopify-e212e",
  storageBucket: "shopify-e212e.appspot.com",
  messagingSenderId: "912364248849",
  appId: "1:912364248849:web:e0f6c3dad7e2e2007b36b0",
  measurementId: "G-11T4VGR6KT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
