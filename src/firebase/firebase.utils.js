import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

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

  // const usersCollectionRef = collection(db, "users");
  // const userCollectionSnapshot = await getDocs(usersCollectionRef);
  // console.log("****Users REF: ", usersCollectionRef);
  // console.log("****Users SS: ", userCollectionSnapshot);
  // console.log("***Data");
  // userCollectionSnapshot.forEach((doc) => console.log(doc.data()));

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

// BATCHED WRITE
// UTILITY FUNCTION TO ADD DATA TO THE FIREBASE
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// ADDING ID, PATH(URL)
// TO SOLLECTION SNAPSHOT
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // CONVERT ARRAY TO OBJECT NORMALISATION
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
