// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSZViOPkda5EVGEDA43sm-SXipESNSOMw",
  authDomain: "maze-game-generator-0.firebaseapp.com",
  projectId: "maze-game-generator-0",
  storageBucket: "maze-game-generator-0.appspot.com",
  messagingSenderId: "518784231859",
  appId: "1:518784231859:web:21c8db29d4b3b1605083c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };