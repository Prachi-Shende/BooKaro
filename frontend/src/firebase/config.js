// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
export const firebaseConfig = {
  apiKey: "AIzaSyArNC3wc3BszJvLtcJKhh--lQC4-QSBPEk",
  authDomain: "bookaro-1ef90.firebaseapp.com",
  projectId: "bookaro-1ef90",
  storageBucket: "bookaro-1ef90.appspot.com",
  messagingSenderId: "688823678635",
  appId: "1:688823678635:web:cb6d2b9fda26c17f33a9ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services
export { app, auth, db };
