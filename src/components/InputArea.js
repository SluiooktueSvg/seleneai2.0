export function initInputArea(onSend) {
  const container = document.createElement('div');
  container.className = 'input-area-container';
  const cleanupCallbacks = [];

  container.innerHTML = `
    <div class="input-box">
      <button class="icon-btn" id="upload-btn" aria-label="Adjuntar imagen" data-tooltip="Adjuntar imagen">
        <svg viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"></path></svg>
      </button>
      
      <div class="input-content-wrapper">
        <div id="chips-container" class="chips-container"></div>
        <textarea 
          id="chat-input" 
          placeholder="Introduce un mensaje aquí" 
          rows="1"
        ></textarea>
      </div>
      <button class="icon-btn" id="mic-btn" aria-label="Usar micrófono" data-tooltip="Usar micrófono">
        <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
      </button>
      <button id="send-btn" class="send-btn icon-btn" aria-label="Enviar mensaje" data-tooltip="Enviar mensaje" disabled>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </button>
    </div>
    <div class="disclaimer">
      <span class="selene-text">Selene</span> puede mostrar información imprecisa, incluso sobre personas, por lo que debes verificar sus respuestas.
    </div>
  `;

  const textarea = container.querySelector('#chat-input');
  const sendBtn = container.querySelector('#send-btn');
  const chipsContainer = container.querySelector('#chips-container');
  const mobilePlaceholderQuery = window.matchMedia('(max-width: 420px)');

  const updatePlaceholder = () => {
    textarea.placeholder = mobilePlaceholderQuery.matches
      ? 'Escribe un mensaje'
      : 'Introduce un mensaje aqui';
  };
  updatePlaceholder();

  const handlePlaceholderChange = () => updatePlaceholder();
  if (typeof mobilePlaceholderQuery.addEventListener === 'function') {
    mobilePlaceholderQuery.addEventListener('change', handlePlaceholderChange);
    cleanupCallbacks.push(() => mobilePlaceholderQuery.removeEventListener('change', handlePlaceholderChange));
  } else if (typeof mobilePlaceholderQuery.addListener === 'function') {
    mobilePlaceholderQuery.addListener(handlePlaceholderChange);
    cleanupCallbacks.push(() => mobilePlaceholderQuery.removeListener(handlePlaceholderChange));
  }

  const addChip = (text, iconSVG) => {
    const chip = document.createElement('div');
    chip.className = 'input-chip';
    chip.dataset.prompt = text;
    chip.innerHTML = `
      <div class="chip-icon">${iconSVG}</div>
      <span class="chip-text">${text}</span>
      <button class="chip-close">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
      </button>
    `;

    chip.querySelector('.chip-close').onclick = (e) => {
      e.stopPropagation();
      chip.remove();
      updateSendButton();
    };

    chipsContainer.appendChild(chip);
    updateSendButton();
  };

  const updateSendButton = () => {
    const hasChips = chipsContainer.children.length > 0;
    const hasText = textarea.value.trim().length > 0;

    if (hasText || hasChips) {
      sendBtn.removeAttribute('disabled');
      sendBtn.classList.add('active');
    } else {
      sendBtn.setAttribute('disabled', 'true');
      sendBtn.classList.remove('active');
    }
  };

  const handleInput = () => {
    textarea.style.height = 'auto';
    const maxInputHeight = 140;
    const nextHeight = Math.min(textarea.scrollHeight, maxInputHeight);
    textarea.style.height = `${nextHeight}px`;
    updateSendButton();
  };
  textarea.addEventListener('input', handleInput);
  cleanupCallbacks.push(() => textarea.removeEventListener('input', handleInput));

  const handleSend = () => {
    const text = textarea.value.trim();
    const chipPrompts = Array.from(chipsContainer.children)
      .map((chip) => chip.dataset.prompt?.trim())
      .filter(Boolean);

    if (text || chipPrompts.length > 0) {
      const fullMessage = [...chipPrompts, text].filter(Boolean).join('\n');
      onSend(fullMessage);

      textarea.value = '';
      textarea.style.height = 'auto';
      chipsContainer.innerHTML = '';
      updateSendButton();
    }
  };

  sendBtn.addEventListener('click', handleSend);
  cleanupCallbacks.push(() => sendBtn.removeEventListener('click', handleSend));

  const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  textarea.addEventListener('keydown', handleKeydown);
  cleanupCallbacks.push(() => textarea.removeEventListener('keydown', handleKeydown));

  const showModal = () => {
    const modal = document.createElement('div');
    modal.className = 'feature-modal-overlay';
    modal.innerHTML = `
        <div class="feature-modal">
            <h2>Función no disponible</h2>
            <p>Lo sentimos, esta funcionalidad aún no está activa en esta versión. Estamos trabajando duro para traerla pronto.</p>
            <button class="close-btn">Entendido</button>
        </div>
      `;
    document.body.appendChild(modal);

    const close = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.close-btn').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  };

  const uploadBtn = container.querySelector('#upload-btn');
  const micBtn = container.querySelector('#mic-btn');
  uploadBtn.addEventListener('click', showModal);
  micBtn.addEventListener('click', showModal);
  cleanupCallbacks.push(() => uploadBtn.removeEventListener('click', showModal));
  cleanupCallbacks.push(() => micBtn.removeEventListener('click', showModal));

  return {
    element: container,
    addChip,
    destroy: () => {
      cleanupCallbacks.forEach((callback) => callback());
    }
  };
}
