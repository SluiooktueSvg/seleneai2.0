
export class ConfirmModal {
    constructor() {
        this.element = null;
        this.init();
    }

    init() {
        // Create Modal HTML
        this.element = document.createElement('div');
        this.element.className = 'modal-overlay hidden';
        this.element.id = 'confirm-modal-overlay'; // Standard ID
        this.element.innerHTML = `
            <div class="confirm-window">
                <div class="confirm-icon-area">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
                <div class="confirm-content">
                    <h2>¿Eliminar chat?</h2>
                    <p>Esta acción es irreversible. Se borrarán todos los mensajes de esta conversación.</p>
                </div>
                <div class="confirm-actions">
                     <button class="btn-cancel" id="confirm-cancel">Cancelar</button>
                     <button class="btn-danger" id="confirm-delete">Eliminar</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.element);

        // Bind events
        this.element.querySelector('#confirm-cancel').addEventListener('click', () => this.close());
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) this.close();
        });
    }

    open(onConfirm) {
        this.onConfirm = onConfirm;
        this.element.classList.remove('hidden');
        this.element.classList.add('fade-in');

        // Re-bind confirm button
        const confirmBtn = this.element.querySelector('#confirm-delete');
        const newBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

        newBtn.addEventListener('click', () => {
            if (this.onConfirm) this.onConfirm();
            this.close();
        });
    }

    close() {
        this.element.classList.add('hidden');
        this.element.classList.remove('fade-in');
    }
}
