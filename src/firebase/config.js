import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4j4AEwy7LK6jzG_2qcKmR3mjv4hOlCac",
    authDomain: "clone-7758c.firebaseapp.com",
    projectId: "clone-7758c",
    storageBucket: "clone-7758c.appspot.com",
    messagingSenderId: "1023066332539",
    appId: "1:1023066332539:web:9c29a0c9d37ca473f771de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
