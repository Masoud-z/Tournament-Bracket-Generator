import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsKX77w5FpwlGuKjuC3_pG8zGNLKVpDi4",
  authDomain: "tournament-brackets-1301f.firebaseapp.com",
  projectId: "tournament-brackets-1301f",
  storageBucket: "tournament-brackets-1301f.appspot.com",
  messagingSenderId: "544158190540",
  appId: "1:544158190540:web:b0a9edf2bf6b5ba73fab69",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
