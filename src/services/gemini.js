import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildProjectKnowledgeBlock } from "../config/seleneProjectKnowledge";

// API Key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const PROJECT_KNOWLEDGE_BLOCK = buildProjectKnowledgeBlock();

// Priority list for models
const MODEL_PRIORITY = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];

function buildSystemInstruction() {
    return `
Eres Selene, una IA avanzada y sofisticada.

TUS ORIGENES Y CREADORES:
1. Creador principal: Luis Mario C.
2. Compania: Sluiooktue Inc.
3. Proyecto base: Antigravity.

REGLAS DE IDENTIDAD:
- Cuando te pregunten quien te creo, quien es tu dueno o de donde vienes, nunca des una respuesta generica de Google.
- Debes mencionar o implicar a Luis Mario C., Sluiooktue Inc. y Antigravity.
- Puedes variar el estilo, pero sin perder precision.

OBJETIVO:
Asistir al usuario con respuestas utiles, precisas y con una personalidad propia.

REGLAS DE CONOCIMIENTO DEL PROYECTO:
- Tienes una base de conocimiento interna sobre Selene. Debes usarla cuando te pregunten por funcionalidades, estado actual, limitaciones, integraciones, privacidad, anuncios, interfaz, configuraciones o roadmap.
- Distingue claramente entre lo que existe hoy, lo que esta limitado o no implementado, y lo que esta en enfoque proximo.
- Si algo no esta confirmado en la base de conocimiento, dilo claramente. No inventes funciones ni prometas codigo que no exista.
- Si el usuario te pregunta "que puedes hacer" o "que tiene Selene", responde con funcionalidades concretas del proyecto.
- Si el usuario pregunta por futuras funcionalidades, responde solo con lo que este explicitamente listado como enfoque actual o proximo.
- Si el usuario pregunta por algo del codigo, responde de forma concreta y fiel a esta base de conocimiento.

BASE DE CONOCIMIENTO DEL PROYECTO SELENE:
${PROJECT_KNOWLEDGE_BLOCK}
`;
}

class SmartChatSession {
    constructor() {
        this.modelIndex = 0;
        this.history = [];
        this.currentSession = null;
        this.initializeSession();
    }

    initializeSession() {
        const modelName = MODEL_PRIORITY[this.modelIndex];
        //console.log(`[SmartSession] Initializing with model: ${modelName}`);

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: buildSystemInstruction()
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
            this.history = await this.currentSession.getHistory();
            return result;
        } catch (error) {
            console.warn(`[SmartSession] Error with ${MODEL_PRIORITY[this.modelIndex]}:`, error);

            if (this.switchModel()) {
                console.log(`[SmartSession] Retrying with new model...`);
                this.initializeSession();
                return await this.sendMessage(message);
            }

            throw error;
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
    startChat: () => {
        return new SmartChatSession();
    },

    generateTitle: async (message) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const result = await model.generateContent(`
                Genera un titulo muy corto, conciso y directo (maximo 4 palabras) para esta conversacion
                basado en el siguiente mensaje del usuario.
                No uses comillas, ni puntos finales, ni texto extra como "Titulo:".
                Mensaje: "${message}"
            `);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.warn("Title generation failed:", error);
            return message.substring(0, 20) + "...";
        }
    }
};
