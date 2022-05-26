// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxXb__lC49sQEhxzbmPeiWSxbuopTC204",
  authDomain: "gist-e19c7.firebaseapp.com",
  databaseURL: "https://gist-e19c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gist-e19c7",
  storageBucket: "gist-e19c7.appspot.com",
  messagingSenderId: "664575745158",
  appId: "1:664575745158:web:164757ac1f41e72b88c507",
  measurementId: "G-PXJVXZ9LPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create an instance of the Google provider object
// Google sign-in > redirect to the sign-in page 
export const provider = new GoogleAuthProvider();


