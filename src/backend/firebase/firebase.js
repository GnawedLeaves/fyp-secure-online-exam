// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnM3OR0JNYbhpGRLd5fmxhAlEwhKNmf8o",
  authDomain: "online-exam-platform-97200.firebaseapp.com",
  projectId: "online-exam-platform-97200",
  storageBucket: "online-exam-platform-97200.appspot.com",
  messagingSenderId: "192481901185",
  appId: "1:192481901185:web:e32fff03d5c905832d2b80",
  measurementId: "G-Y6Q02KHVXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// other way too, export..
//const analytics = getAnalytics(app);

export const auth = getAuth();
// export const db = getFirestore(app);
export const db = getFirestore(app); // firebase.firestore(); if do the other way
export const storage = getStorage(app); // firebase.storage();
