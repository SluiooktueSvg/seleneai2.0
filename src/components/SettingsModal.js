export function initSettingsModal() {
  // Create modal container
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay hidden';

  modalOverlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>Ajustes</h2>
        <button class="close-btn" aria-label="Close settings">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </button>
      </div>
      <div class="modal-content">
        <div class="setting-item">
          <div class="setting-label">
            <span>Tamaño de fuente</span>
            <span class="setting-desc">Ajusta el tamaño del texto en el chat</span>
          </div>
          <div class="setting-control">
            <select id="font-size-select">
              <option value="normal">Normal</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">
            <span>Velocidad de respuesta</span>
            <span class="setting-desc">Ajusta qué tan rápido escribe la IA</span>
          </div>
          <div class="setting-control">
            <select id="speed-select">
              <option value="20">Normal</option>
              <option value="5">Rápida</option>
              <option value="50">Lenta</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">
            <span>Animaciones</span>
            <span class="setting-desc">Efectos visuales y transiciones</span>
          </div>
          <div class="setting-control">
            <label class="switch">
              <input type="checkbox" id="animations-toggle" checked>
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Logic
  const closeBtn = modalOverlay.querySelector('.close-btn');
  const fontSizeSelect = modalOverlay.querySelector('#font-size-select');
  const speedSelect = modalOverlay.querySelector('#speed-select');
  const animationsToggle = modalOverlay.querySelector('#animations-toggle');

  const closeModal = () => modalOverlay.classList.add('hidden');
  const openModal = () => modalOverlay.classList.remove('hidden');

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Apply Settings
  fontSizeSelect.addEventListener('change', (e) => {
    const size = e.target.value;
    if (size === 'large') {
      document.documentElement.style.setProperty('--font-size-base', '18px');
    } else {
      document.documentElement.style.setProperty('--font-size-base', '16px');
    }
  });

  speedSelect.addEventListener('change', (e) => {
    // Store in a global accessible place or custom event
    window.SELENE_SETTINGS = window.SELENE_SETTINGS || {};
    window.SELENE_SETTINGS.typingSpeed = parseInt(e.target.value);
  });

  animationsToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
  });

  return { open: openModal };
}
