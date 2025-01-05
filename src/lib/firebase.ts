import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
  console.warn(
    'Missing Firebase configuration. Authentication features will not work properly.\n' +
    'Please ensure all Firebase environment variables are set.'
  );
}

// Initialize Firebase with fallback values for development
const app = initializeApp({
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey || 'demo-api-key',
  authDomain: firebaseConfig.authDomain || 'demo.firebaseapp.com'
});

export const auth = getAuth(app);
