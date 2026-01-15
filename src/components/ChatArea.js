import { initInputArea } from './InputArea';
import { GeminiService } from '../services/gemini';
import { ChatHistoryService } from '../services/history';

export function initChatArea(user) {
  const chatContainer = document.getElementById('chat-container');
  let currentChatId = null;
  let messagesUnsubscribe = null;

  // Initialize Chat Session (Always start fresh, but history might be injected if we support it)
  // For now, simpler implementation: new chats behave as before, 
  // loading a chat just displays it (maybe read-only or continues context if we fetch history)
  let chatSession;
  try {
    chatSession = GeminiService.startChat();
  } catch (e) {
    console.error("Failed to start chat session", e);
  }

  // Create Main Scroll Area
  const messagesArea = document.createElement('div');
  messagesArea.className = 'messages-area';

  // Welcome Hero (Initially visible)
  const createWelcomeHero = () => {
    const hero = document.createElement('div');
    const userName = user?.displayName ? user.displayName.split(' ')[0] : 'Human';

    hero.className = 'welcome-hero';
    hero.innerHTML = `
      <div class="greeting">
        <span class="gradient-text">Hola, ${userName}</span>
        <span class="sub-text">¿En qué puedo ayudarte hoy?</span>
      </div>
      <div class="suggestions-grid">
        <div class="suggestion-card">
          <p>Explícame este código</p>
          <div class="icon-box">
             <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg>
          </div>
        </div>
        <div class="suggestion-card">
          <p>Ayúdame a escribir un correo</p>
          <div class="icon-box">
             <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
          </div>
        </div>
        <div class="suggestion-card">
          <p>Crea un plan de estudio</p>
          <div class="icon-box">
             <svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>
          </div>
        </div>
        <div class="suggestion-card">
          <p>Genera ideas para un blog</p>
          <div class="icon-box">
             <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></svg>
          </div>
        </div>
      </div>
    `;
    return hero;
  };

  let welcomeHero = createWelcomeHero();
  messagesArea.appendChild(welcomeHero);
  chatContainer.appendChild(messagesArea);

  // NEW: Listen for 'load-chat' event from Sidebar
  document.addEventListener('load-chat', (e) => {
    const chatId = e.detail.chatId;
    loadChat(chatId);
  });

  const loadChat = (chatId) => {
    currentChatId = chatId;
    // 1. Clear current view
    messagesArea.innerHTML = '';
    if (welcomeHero) welcomeHero.remove();

    // 2. Unsubscribe previous listener
    if (messagesUnsubscribe) messagesUnsubscribe();

    // 3. Subscribe to new messages
    messagesUnsubscribe = ChatHistoryService.subscribeToMessages(user.uid, chatId, (messages) => {
      messagesArea.innerHTML = ''; // Re-render for simplicity or we could append smart
      // BUT: Firestore snapshot returns ALL messages. 
      // Optimization: Ideally we just append new ones, but for MPV full re-render is safer to ensure order.

      messages.forEach(msg => {
        appendMessage(messagesArea, msg.text, msg.role, false); // false = no typing effect for history
      });

      // Scroll to bottom
      messagesArea.scrollTop = messagesArea.scrollHeight;
    });

    // Reset Gemini Context (Optional: We could rebuild history array here)
    chatSession = GeminiService.startChat();
  };

  // Handle new messages
  const onSend = async (text) => {
    // Hide welcome hero if first message
    if (welcomeHero && welcomeHero.parentNode) {
      welcomeHero.remove();
    }

    // 1. Optimistic UI Update (Show immediately)
    appendMessage(messagesArea, text, 'user');

    // 2. Lock the Chat ID for this transaction
    // If it's a new chat, we'll establish the ID after saving the first message.
    let targetChatId = currentChatId;
    let isNewChat = !targetChatId;

    try {
      // Save User Message
      const savedChatId = await ChatHistoryService.saveMessage(user.uid, targetChatId, text, 'user');

      // If we started as a new chat, we now have an ID.
      if (!targetChatId) {
        targetChatId = savedChatId;
        // If the user hasn't switched away yet, update the view state.
        if (!currentChatId) {
          currentChatId = targetChatId;
        }
      }

      // AUTO-TITLING behavior (background)
      if (isNewChat && targetChatId) {
        (async () => {
          const title = await GeminiService.generateTitle(text);
          await ChatHistoryService.updateChatTitle(user.uid, targetChatId, title);
        })();
      }

    } catch (dbError) {
      console.error("Firestore Error (User Msg):", dbError);
    }

    // Show AI loading (Only if still looking at the same chat)
    if (currentChatId === targetChatId) {
      showLoading(messagesArea);
    }

    try {
      // Start a fresh session if needed, but really we should manage sessions per chat ID ideally.
      // For MVP, we just use a generic session.
      if (!chatSession) {
        chatSession = GeminiService.startChat();
      }

      const result = await chatSession.sendMessage(text);
      const response = await result.response;
      const textResponse = response.text();

      // Remove loading (Only if still looking at the same chat)
      if (currentChatId === targetChatId) {
        removeLoading(messagesArea);
      }

      // 3. Save AI Message to DB 
      // CRITICAL: We save to targetChatId, regardless of where the user is looking now.
      await ChatHistoryService.saveMessage(user.uid, targetChatId, textResponse, 'ai');

      // 4. Render (Only if still looking at the same chat)
      if (currentChatId === targetChatId) {
        appendMessage(messagesArea, textResponse, 'ai');
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      if (currentChatId === targetChatId) {
        removeLoading(messagesArea);
        appendMessage(messagesArea, "Error de conexión o API Key inválida.", 'ai');
      }
    }
  };

  // Initialize Input Area
  const inputArea = initInputArea(onSend);
  chatContainer.appendChild(inputArea);

  // Return control methods
  return {
    reset: () => {
      // Clear all messages
      messagesArea.innerHTML = '';
      currentChatId = null;
      if (messagesUnsubscribe) messagesUnsubscribe();

      // Re-create and append hero
      welcomeHero = createWelcomeHero();
      messagesArea.appendChild(welcomeHero);
      // Reset Chat Session
      chatSession = GeminiService.startChat();

      // Clear sidebar selection
      const all = document.querySelectorAll('.chat-item');
      all.forEach(x => x.classList.remove('active'));
    }
  };
}

function appendMessage(container, text, role, animate = true) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}-message`;

  const icon = role === 'ai'
    ? '<div class="ai-icon"><img src="/vite.svg" alt="AI" /></div>'
    : '';

  msgDiv.innerHTML = `
    ${role === 'ai' ? icon : ''}
    <div class="message-content">
        ${role === 'ai' ? '<div class="sender-name">Selene</div>' : ''}
        <div class="text"></div>
    </div>
  `;

  container.appendChild(msgDiv);

  const textContainer = msgDiv.querySelector('.text');
  if (role === 'ai' && animate) {
    typeText(textContainer, text);
  } else {
    textContainer.textContent = text;
  }

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function showLoading(container) {
  const loader = document.createElement('div');
  loader.id = 'ai-loader';
  loader.className = 'message ai-message loading';
  loader.innerHTML = `
     <div class="ai-icon"><img src="/vite.svg" alt="AI" /></div>
     <div class="message-content">
        <div class="sender-name">Selene</div>
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
     </div>
  `;
  container.appendChild(loader);
  container.scrollTop = container.scrollHeight;
}

function removeLoading(container) {
  const loader = container.querySelector('#ai-loader');
  if (loader) loader.remove();
}

// Helper to simulate typewriter effect
function typeText(element, text, speed = 20) {
  // Check global settings
  if (window.SELENE_SETTINGS && window.SELENE_SETTINGS.typingSpeed) {
    speed = window.SELENE_SETTINGS.typingSpeed;
  }

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      // Scroll to bottom as we type
      const container = element.closest('.messages-area');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } else {
      clearInterval(timer);
    }
  }, speed);
}
