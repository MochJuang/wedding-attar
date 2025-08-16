// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgKnHyPA06EWCMb8fAQbq-UUzKl1keMXw",
    authDomain: "wedding-invite-b817f.firebaseapp.com",
    projectId: "wedding-invite-b817f",
    storageBucket: "wedding-invite-b817f.firebasestorage.app",
    messagingSenderId: "550783456724",
    appId: "1:550783456724:web:826c623ec9be370b607241",
    measurementId: "G-10ZWYZ63XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default {
    db
}