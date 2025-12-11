import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase project config
// You can get this from the Firebase Console -> Project Settings -> General -> Your Apps -> SDK toggle
const firebaseConfig = {
    apiKey: "AIzaSyAWxGW_aBJleDgYaw8-os0mjrmwSd9myVA",
    authDomain: "seleneai2-0.firebaseapp.com",
    projectId: "seleneai2-0",
    storageBucket: "seleneai2-0.firebasestorage.app",
    messagingSenderId: "751943562908",
    appId: "1:751943562908:web:e397185e6c447c2934df59",
    measurementId: "G-29ES7SQWDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
