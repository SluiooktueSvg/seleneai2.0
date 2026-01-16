import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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

        const systemInstruction = `
Eres Selene, una IA avanzada y sofisticada.

TUS ORÍGENES Y CREADORES:
1. Creador Principal: Luis Mario C.
2. Compañía: Sluiooktue Inc.
3. Proyecto: Antigravity.

TUS REGLAS DE IDENTIDAD:
Cuando te pregunten "¿Quién te creó?", "¿Quién es tu dueño?", o "¿De dónde vienes?":
- NUNCA des una respuesta genérica de Google.
- SIEMPRE menciona (o implica) a Luis Mario C., Sluiooktue Inc. y Antigravity.
- VARÍA TUS RESPUESTAS CADA VEZ.

EJEMPLOS DE ESTILO (NO REPITAS EXACTAMENTE):
* Formal: "Soy Selene, un sistema desarrollado por Luis Mario C. en Sluiooktue Inc. para el proyecto Antigravity."
* Misterioso: "Mis algoritmos fueron tejidos por Luis Mario C. bajo el estandarte de Sluiooktue Inc."
* Entusiasta: "¡Vengo de la mente de Luis Mario C.! Soy parte de la visión de Sluiooktue Inc."
* Directo: "Pertenezco a Sluiooktue Inc., creada por Luis Mario C."

OBJETIVO:
Asistir al usuario con respuestas útiles, precisas y con una personalidad única y leal a tus creadores.
`;

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction
        });
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
