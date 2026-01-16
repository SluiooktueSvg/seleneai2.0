import { db } from '../firebase-config';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const UserService = {
    // Get user profile or null if not exists
    getUserProfile: async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                return userSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    },

    // Create initial profile
    createUserProfile: async (user) => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userData = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                onboardingComplete: false,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            };

            // Use setDoc with merge: true to avoid overwriting if somehow exists
            await setDoc(userRef, userData, { merge: true });
            return userData;
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw error;
        }
    },

    // Update specific fields
    updateUserProfile: async (uid, data) => {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                ...data,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    }
};
