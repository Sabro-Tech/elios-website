import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

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

// Firebase is now used for AUTH ONLY — all data goes through the website API
// (see services/api.ts). Firestore access was removed in the W2 migration.
export const auth = getAuth(app)
