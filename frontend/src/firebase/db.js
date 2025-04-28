// src/firebase/db.js
import { getFirestore } from 'firebase/firestore';
import { app } from './config';  // Import initialized Firebase app

// Initialize Firestore
const db = getFirestore(app);

export { db };
