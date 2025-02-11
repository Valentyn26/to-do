import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApLIPf-38u3KFHruCVr5w5lQcy8SDSuYU",
    authDomain: "to-do-14db4.firebaseapp.com",
    projectId: "to-do-14db4",
    storageBucket: "to-do-14db4.firebasestorage.app",
    messagingSenderId: "608714479225",
    appId: "1:608714479225:web:1701353e93285a2db5e6a8",
    measurementId: "G-DF3VKK8SXG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };