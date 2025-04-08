// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVNwhdECMUHr2Hd378YtkazfohJVo2AaQ",
  authDomain: "blog-app-c8163.firebaseapp.com",
  projectId: "blog-app-c8163",
  storageBucket: "blog-app-c8163.firebasestorage.app",
  messagingSenderId: "950219192936",
  appId: "1:950219192936:web:0b977ef9c0a9ea130159dd",
  measurementId: "G-B0YVJX3WR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();