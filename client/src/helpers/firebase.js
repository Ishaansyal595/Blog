// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from '@/helpers/getEnv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: "mern-blog-f08f4.firebaseapp.com",
  projectId: "mern-blog-f08f4",
  storageBucket: "mern-blog-f08f4.firebasestorage.app",
  messagingSenderId: "1096950955637",
  appId: "1:1096950955637:web:a1519c0e04d2324d79423c",
  measurementId: "G-HT8CTFV8K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()