import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOaZrlOnrCqPuaeo5PppFsZ_tUfAi-1GE",
  authDomain: "shopify-e212e.firebaseapp.com",
  projectId: "shopify-e212e",
  storageBucket: "shopify-e212e.appspot.com",
  messagingSenderId: "912364248849",
  appId: "1:912364248849:web:e0f6c3dad7e2e2007b36b0",
  measurementId: "G-11T4VGR6KT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const ss = await getDoc(userRef);

  if (!ss.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    await setDoc(userRef, {
      displayName,
      email,
      createdAt,
      ...additionalData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log("error", err));
  }

  return userRef;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
