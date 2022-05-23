// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2MvQ0rJjYGvcC0uUSBlvM-5Vj2n9EP78",
  authDomain: "maze-game-generator.firebaseapp.com",
  projectId: "maze-game-generator",
  storageBucket: "maze-game-generator.appspot.com",
  messagingSenderId: "354479561061",
  appId: "1:354479561061:web:cda3a6603b5045c337298c",
  measurementId: "G-3XR9PQPHX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };