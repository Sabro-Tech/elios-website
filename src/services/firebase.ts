import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCwd12cbv6gZx6eHRGhxW3z1G-pF8Q6KQo",
    authDomain: "sabrocustomerservice.firebaseapp.com",
    databaseURL: "https://sabrocustomerservice-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sabrocustomerservice",
    storageBucket: "sabrocustomerservice.firebasestorage.app",
    messagingSenderId: "962744128667",
    appId: "1:962744128667:web:00b8ab1e92a0a853df223e",
    measurementId: "G-K30H3VY23P"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
