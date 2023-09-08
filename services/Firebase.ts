import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRTSOYAhemHY4oLGtx78hZCmvA-txSBok",
  authDomain: "coffee-sheet.firebaseapp.com",
  projectId: "coffee-sheet",
  storageBucket: "coffee-sheet.appspot.com",
  messagingSenderId: "756090385804",
  appId: "1:756090385804:web:8ad1a77a49469b47d9d2a9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);