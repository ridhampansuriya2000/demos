import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_KEY ,
  authDomain: "bvm-chat-d742c.firebaseapp.com",
  projectId: "bvm-chat-d742c",
  storageBucket: "bvm-chat-d742c.appspot.com",
  messagingSenderId: "586565410386",
  appId: "1:586565410386:web:1564949f678e9fb3c1498b",
  measurementId: "G-J6V06W86CP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
