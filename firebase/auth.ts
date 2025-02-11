import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";

export const signUp = async (email: string, password: string, username: string) => {
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const user = userData.user;

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: username
            });
        }

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: username,
            role: "viewer"
        });

        await saveTokenToLocalStorage();
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getUserRole = async (uid: string) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data.role;
        } else {
            throw new Error("User not found");
        }
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
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            callback(user);
        } else {
            callback(null);
        }
    });
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
        localStorage.setItem("authToken", token);
    }
};