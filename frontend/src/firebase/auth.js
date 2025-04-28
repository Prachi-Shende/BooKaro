// src/firebase/auth.js
import { getAuth } from 'firebase/auth';
import { app } from './config';  // Import initialized Firebase app (using named export)

const auth = getAuth(app);

export { auth };
