// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rholand-8ab9c.firebaseapp.com",
  projectId: "rholand-8ab9c",
  storageBucket: "rholand-8ab9c.firebasestorage.app",
  messagingSenderId: "875463433368",
  appId: "1:875463433368:web:45a0e064e882401836c4ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);