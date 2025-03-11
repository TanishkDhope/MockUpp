// Import the functions you need from the SDKs you 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmBs7AwB7JPq-FqnLc7FoMWguyHfMa9Mo",
    authDomain: "enigma30-dce65.firebaseapp.com",
    projectId: "enigma30-dce65",
    storageBucket: "enigma30-dce65.firebasestorage.app",
    messagingSenderId: "862900851494",
    appId: "1:862900851494:web:1804c410cacb1d258d27e7",
    measurementId: "G-47LH3EJ3MN"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
