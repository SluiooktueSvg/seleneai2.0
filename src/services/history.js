import { db, auth } from '../firebase-config';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    setDoc
} from "firebase/firestore";

export const ChatHistoryService = {
    // Save a new message to a chat (or create new chat if chatId is null)
    saveMessage: async (userId, chatId, message, role) => {
        if (!userId) return null;

        let currentChatId = chatId;

        // If no chat ID, create a new chat document first
        if (!currentChatId) {
            const chatsRef = collection(db, 'users', userId, 'chats');
            const newChatDoc = await addDoc(chatsRef, {
                title: message.substring(0, 30) + "...", // Simple title from first message
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            currentChatId = newChatDoc.id;
        } else {
            // Update timestamp of existing chat
            const chatDocRef = doc(db, 'users', userId, 'chats', currentChatId);
            // We use setDoc with merge to avoid overwriting if it doesn't exist (safety)
            await setDoc(chatDocRef, { updatedAt: serverTimestamp() }, { merge: true });
        }

        // Add message to subcollection
        const messagesRef = collection(db, 'users', userId, 'chats', currentChatId, 'messages');
        await addDoc(messagesRef, {
            text: message,
            role: role,
            timestamp: serverTimestamp()
        });

        return currentChatId;
    },

    // Listen to user's chat list
    subscribeToChatList: (userId, callback) => {
        if (!userId) return () => { };

        const chatsRef = collection(db, 'users', userId, 'chats');
        const q = query(chatsRef, orderBy('updatedAt', 'desc'));

        return onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(chats);
        });
    },

    // Listen to messages of a specific chat
    subscribeToMessages: (userId, chatId, callback) => {
        if (!userId || !chatId) return () => { };

        const messagesRef = collection(db, 'users', userId, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(messages);
        });
    },

    // Update the title of a chat
    updateChatTitle: async (userId, chatId, title) => {
        if (!userId || !chatId || !title) return;

        try {
            const chatDocRef = doc(db, 'users', userId, 'chats', chatId);
            await setDoc(chatDocRef, { title: title }, { merge: true });
        } catch (error) {
            console.error("Error updating chat title:", error);
        }
    }
};
