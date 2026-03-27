export class PrivacyPolicyModal {
    constructor() {
        this.element = null;
        this.onAccept = null;
        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.className = 'privacy-modal-overlay hidden';
        this.element.id = 'privacy-policy-modal';
        this.element.innerHTML = `
            <div class="privacy-modal-window">
                <div class="privacy-modal-content">
                    <h2>Política de privacidad</h2>
                    <p>Selene AI puede procesar los mensajes que compartes para generar respuestas y asistirte dentro de la aplicación.</p>
                    <p>También podemos guardar datos básicos de tu cuenta y parte del historial de uso para mejorar tu experiencia y conservar tus preferencias.</p>
                    <p>No compartiremos tu información con terceros, salvo en los casos en que exista una obligación legal.</p>
                    <p>Te recomendamos no introducir datos sensibles, financieros, médicos o cualquier información personal que no desees compartir.</p>
                    <div class="privacy-modal-note">
                        Usa Selene AI de forma responsable y evita enviar contenido confidencial o especialmente sensible.
                    </div>
                    <div class="privacy-modal-actions">
                        <button type="button" class="btn-primary privacy-accept-btn">Aceptar y continuar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.element);
    }

    open(onAccept) {
        this.onAccept = onAccept;
        this.element.classList.remove('hidden');
        this.element.classList.add('fade-in');

        const acceptBtn = this.element.querySelector('.privacy-accept-btn');
        const newBtn = acceptBtn.cloneNode(true);
        acceptBtn.parentNode.replaceChild(newBtn, acceptBtn);

        newBtn.addEventListener('click', async () => {
            if (this.onAccept) {
                await this.onAccept();
            }
            this.close();
        });
    }

    close() {
        this.element.classList.add('hidden');
        this.element.classList.remove('fade-in');
    }
}