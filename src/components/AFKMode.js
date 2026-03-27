import '../styles/afk.css';

const facts = [
    "Cada vez que barajas una baraja de cartas, es casi seguro que esa **combinación exacta** de cartas nunca ha existido en toda la historia del universo.",
    "Si el Sol fuera del tamaño de un glóbulo blanco, la Vía Láctea sería del tamaño de **Estados Unidos**.",
    "Hay más átomos en un **vaso de agua** que vasos de agua en todos los océanos de la Tierra.",
    "El cuerpo humano contiene suficiente carbono para producir **900 lápices**.",
    "Las ballenas azules son tan grandes que un humano podría nadar a través de sus **arterias**.",
    "Si pudieras eliminar todo el espacio vacío de los átomos de todos los seres humanos, la población mundial cabría dentro de una **manzana**.",
    "En Saturno y Júpiter, los científicos creen que **llueven diamantes**.",
    "El tiempo transcurre más lento en la cima de una montaña que a nivel del mar debido a la **dilatación temporal gravitacional**.",
    "Un trozo de una estrella de neutrones del tamaño de una cucharadita pesaría tanto como el **Monte Everest**.",
    "Cuando miras las estrellas, estás viendo el pasado. Algunas de esas estrellas murieron hace **millones de años**."
];

// Función auxiliar para convertir **texto** en HTML real
const formatFact = (text) => {
    // Reemplaza **palabra** por un span con clase resaltada
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="fact-highlight">$1</span>');
};

export function initAFKMode() {
    let idleTime = 0;
    const idleLimit = 20; // Segundos
    let afkActive = false;
    let factInterval;
    let currentFactIndex = 0;

    // Crear Overlay (Simplificado para optimización)
    const overlay = document.createElement('div');
    overlay.className = 'afk-overlay';

    overlay.innerHTML = `
        <div class="afk-vignette"></div> <div class="afk-content">
            <div class="afk-logo-container">
                <svg class="afk-icon" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.2-.08-.42-.15-.65-.15-.49 0-.96.08-1.41.22l-.2-1.12c.96-.28 1.98-.45 3.04-.45.64 0 1.27.06 1.88.17C15.14 2 13.62 3 12 3z"/>
                </svg>
            </div>
            <div class="afk-facts-container">
                <div class="fact-label">¿SABÍAS QUE?</div>
                <p id="afk-fact-text" class="afk-fact"></p>
            </div>
        </div>
        <div class="afk-footer">
            <span class="exit-text">Presiona cualquier tecla para volver</span>
            <div class="progress-track">
                <div class="afk-progress" id="afk-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const factText = overlay.querySelector('#afk-fact-text');
    const progressBar = overlay.querySelector('#afk-progress');

    // Show next fact function (Transiciones suaves)
const rotateFact = () => {
        factText.style.opacity = '0';
        factText.style.transform = 'translateY(-10px)';
        
        progressBar.style.transition = 'none';
        progressBar.style.transform = 'scaleX(0)';

        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % facts.length;
            
            // CAMBIO AQUÍ: Aplicamos el formato antes de insertar
            factText.innerHTML = formatFact(facts[currentFactIndex]);
            
            factText.style.opacity = '1';
            factText.style.transform = 'translateY(0)';

            setTimeout(() => {
                progressBar.style.transition = 'transform 12s linear';
                progressBar.style.transform = 'scaleX(1)';
            }, 100);
        }, 800);
    };

    const startAFK = () => {
        if (afkActive) return;
        afkActive = true;
        overlay.classList.add('active');
        factText.innerHTML = formatFact(facts[currentFactIndex]);
        
        // Animación inicial de la barra
        setTimeout(() => {
            progressBar.style.transition = 'transform 12s linear';
            progressBar.style.transform = 'scaleX(1)';
        }, 100);

        // Iniciar Loop
        factInterval = setInterval(rotateFact, 12000); // 12 segundos por dato
    };

    const stopAFK = () => {
        if (!afkActive) {
            idleTime = 0;
            return;
        }
        afkActive = false;
        overlay.classList.remove('active');
        clearInterval(factInterval);
        idleTime = 0;
        
        // Reset progreso (Transform)
        progressBar.style.transition = 'none';
        progressBar.style.transform = 'scaleX(0)';
    };

    // Idle Timer Loop
    setInterval(() => {
        if (!afkActive) {
            idleTime++;
            if (idleTime >= idleLimit) startAFK();
        }
    }, 1000);

    // Event Listeners to reset
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, stopAFK);
    });
}