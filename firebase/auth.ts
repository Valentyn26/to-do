import { auth, db } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email: string, password: string, username: string) => {
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const user = userData.user;

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: username
            });
        }

        await saveTokenToLocalStorage();
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const userData = await signInWithEmailAndPassword(auth, email, password);
        await saveTokenToLocalStorage();
        return userData.user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("authToken");
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback);
};

const getToken = async () => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        return token;
    }
    return null;
};

export const saveTokenToLocalStorage = async () => {
    const token = await getToken();
    if (token) {
        localStorage.setItem("authToken", token); // зберігаємо токен у LocalStorage
    }
};

export const refreshToken = async () => {
    const user = auth.currentUser;
    if (user) {
        const newToken = await user.getIdToken(true); // true для примусової перевірки і поновлення токену
        localStorage.setItem("authToken", newToken);
    }
};