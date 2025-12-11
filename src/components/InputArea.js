export function initInputArea(onSend) {
  const container = document.createElement('div');
  container.className = 'input-area-container';

  container.innerHTML = `
    <div class="input-box">
      <button class="icon-btn" aria-label="Upload image">
        <svg viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"></path></svg>
      </button>
      <textarea 
        id="chat-input" 
        placeholder="Introduce un mensaje aquí" 
        rows="1"
      ></textarea>
      <button class="icon-btn" aria-label="Use microphone">
        <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
      </button>
      <button id="send-btn" class="send-btn icon-btn" aria-label="Send message" disabled>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </button>
    </div>
    <div class="disclaimer">
      Selene puede mostrar información imprecisa, incluso sobre personas, por lo que debes verificar sus respuestas.
    </div>
  `;

  // Auto-resize textarea
  const textarea = container.querySelector('#chat-input');
  const sendBtn = container.querySelector('#send-btn');

  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    if (textarea.value.trim()) {
      sendBtn.removeAttribute('disabled');
      sendBtn.classList.add('active');
    } else {
      sendBtn.setAttribute('disabled', 'true');
      sendBtn.classList.remove('active');
    }
  });

  // Handle Send
  const handleSend = () => {
    const text = textarea.value.trim();
    if (text) {
      onSend(text);
      textarea.value = '';
      textarea.style.height = 'auto'; // Reset height
      sendBtn.setAttribute('disabled', 'true');
      sendBtn.classList.remove('active');
    }
  }

  sendBtn.addEventListener('click', handleSend);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  return container;
}
