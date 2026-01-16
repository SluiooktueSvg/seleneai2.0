export function initInputArea(onSend) {
  const container = document.createElement('div');
  container.className = 'input-area-container';

  container.innerHTML = `
    <div class="input-box">
      <button class="icon-btn" aria-label="Upload image">
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
      <button class="icon-btn" aria-label="Use microphone">
        <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
      </button>
      <button id="send-btn" class="send-btn icon-btn" aria-label="Send message" disabled>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </button>
    </div>
    <div class="disclaimer">
      <span class="selene-text">Selene</span> puede mostrar información imprecisa, incluso sobre personas, por lo que debes verificar sus respuestas.
    </div>
  `;

  // Auto-resize textarea
  const textarea = container.querySelector('#chat-input');
  const sendBtn = container.querySelector('#send-btn');
  const chipsContainer = container.querySelector('#chips-container');

  // Logic to add a chip
  const addChip = (text, iconSVG) => {
    // Clear previous chips if we only want one active context at a time (Gemini style usually allows one image/context)
    // For now, let's append, but easy to undo.
    const chip = document.createElement('div');
    chip.className = 'input-chip';
    chip.innerHTML = `
      <div class="chip-icon">${iconSVG}</div>
      <span class="chip-text">${text}</span>
      <button class="chip-close">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
      </button>
    `;

    // Remove chip on click
    chip.querySelector('.chip-close').onclick = (e) => {
      e.stopPropagation();
      chip.remove();
      // Check input state again
      updateSendButton();
    };

    chipsContainer.appendChild(chip);
    updateSendButton();
  };

  const updateSendButton = () => {
    // Enable send if specific text OR chips exist
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

  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    updateSendButton();
  });

  // Handle Send
  const handleSend = () => {
    const text = textarea.value.trim();
    // Gather chips info if we wanted to send it separately, 
    // for now we just send text, but we should make sure chips mimic context.
    // If chips mimic "appending text", we might want to append them to the text?
    // The user said "adds to input". 
    // If it's a chip, it's usually context. 
    // Let's assume the chip IS part of the message or context.

    // For this implementation, if there is a chip, we treat it as valid input to allow sending.
    const hasChips = chipsContainer.children.length > 0;

    if (text || hasChips) {
      // Construct message
      let fullMessage = text;

      // If chips are present, maybe we should prepend them as context text?
      // Or just send the text and assume the chip was for "show".
      // Let's just send the text for now, assuming the chip might have PRE-FILLED the text or acts as context.
      // Wait, user said "select option -> add to input".
      // In Gemini, "Create image" adds a chip and you type "A cat".
      // We will send the text. Ideally we'd send metadata about the chip.

      onSend(fullMessage);

      textarea.value = '';
      textarea.style.height = 'auto'; // Reset height
      chipsContainer.innerHTML = ''; // Clear chips logic? Usually yes after send.
      updateSendButton();
    }
  }

  sendBtn.addEventListener('click', handleSend);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  return { element: container, addChip };
}
