// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYtCqIiYb_mSb66Vubgc2m0zq5QPJcIPY",
  authDomain: "anonmyousnitt.firebaseapp.com",
  projectId: "anonmyousnitt",
  storageBucket: "anonmyousnitt.firebasestorage.app",
  messagingSenderId: "729018191198",
  appId: "1:729018191198:web:5acba9ec9e9cb3306353cf",
  measurementId: "G-6QL7ZXXDT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };