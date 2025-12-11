import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Replace with your actual Gemini API Key
const API_KEY = "AIzaSyDKqJSITaZn02hXUBriNGVAvrpIeQ_Q7OA"; // User needs to put their key here.

const genAI = new GoogleGenerativeAI(API_KEY);

// Priority list for models
const MODEL_PRIORITY = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];

class SmartChatSession {
    constructor() {
        this.modelIndex = 0;
        this.history = []; // Keep local history to allow session reconstruction
        this.currentSession = null;
        this.initializeSession();
    }

    initializeSession() {
        const modelName = MODEL_PRIORITY[this.modelIndex];
        console.log(`[SmartSession] Initializing with model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });
        this.currentSession = model.startChat({
            history: this.history,
            generationConfig: {
                maxOutputTokens: 2000,
            },
        });
    }

    async sendMessage(message) {
        try {
            console.log(`[SmartSession] Sending message via ${MODEL_PRIORITY[this.modelIndex]}...`);
            const result = await this.currentSession.sendMessage(message);

            // On success, update local history (approximation, as the SDK manages its own)
            // Ideally we rely on the SDK's history for the next init if needed, 
            // but getting it from the session is safer.
            this.history = await this.currentSession.getHistory();

            return result;

        } catch (error) {
            console.warn(`[SmartSession] Error with ${MODEL_PRIORITY[this.modelIndex]}:`, error);

            // Attempt to switch model
            if (this.switchModel()) {
                console.log(`[SmartSession] Retrying with new model...`);
                // Re-initialize and retry
                this.initializeSession();
                return await this.sendMessage(message); // Recursive retry
            } else {
                // No more models to try
                throw error;
            }
        }
    }

    switchModel() {
        if (this.modelIndex < MODEL_PRIORITY.length - 1) {
            this.modelIndex++;
            console.log(`[SmartSession] Switching fallback to: ${MODEL_PRIORITY[this.modelIndex]}`);
            return true;
        }
        return false;
    }
}

export const GeminiService = {
    // Factory method to get a new smart session
    startChat: () => {
        return new SmartChatSession();
    },

    // Standard one-off generation for titles
    generateTitle: async (message) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const result = await model.generateContent(`
                Genera un título muy corto, conciso y directo (máximo 4 palabras) para esta conversación 
                basado en el siguiente mensaje del usuario. 
                No uses comillas, ni puntos finales, ni texto extra como "Título:".
                Mensaje: "${message}"
            `);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.warn("Title generation failed:", error);
            // Fallback title
            return message.substring(0, 20) + "...";
        }
    }
};
