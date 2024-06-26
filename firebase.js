// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore  } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBkbQ9Q7DRwjqKcmsWXDYZkeOmF4vyr20A",
  authDomain: "customised-food-labels.firebaseapp.com",
  projectId: "customised-food-labels",
  storageBucket: "customised-food-labels.appspot.com",
  messagingSenderId: "582501833374",
  appId: "1:582501833374:web:0471a799c328dd61c8b98f",
  measurementId: "G-N6TRL7FDT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };