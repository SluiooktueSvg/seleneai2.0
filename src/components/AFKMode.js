import '../styles/afk.css';

const facts = [
    "La luz del Sol tarda aproximadamente <strong>8 minutos y 20 segundos</strong> en llegar a la Tierra.",
    "El universo observable contiene más estrellas que granos de arena en todas las playas de la Tierra juntas.",
    "Un día en Venus es más largo que un año en Venus.",
    "Los pulpos tienen tres corazones y sangre azul.",
    "El núcleo de la Tierra es tan caliente como la superficie del Sol.",
    "Existen más conexiones sinápticas en un solo cerebro humano que estrellas en la Vía Láctea.",
    "La Miel es el único alimento que no se estropea. Se ha encontrado miel comestible en tumbas egipcias.",
    "Si pudieras doblar una hoja de papel 42 veces, alcanzaría la Luna.",
    "Hay más formas posibles de barajar una baraja de cartas que átomos en la Tierra.",
    "Los átomos son 99.9999999999999% espacio vacío.",
    "La Gran Mancha Roja de Júpiter es una tormenta que ha durado al menos 350 años y es más grande que dos Tierras.",
    "Un fotón puede tardar 40,000 años en viajar desde el núcleo del Sol hasta su superficie, pero solo 8 minutos en llegar a la Tierra.",
    "El agua caliente se congela más rápido que el agua fría en ciertas condiciones, conocido como el efecto Mpemba."
];

export function initAFKMode() {
    let idleTime = 0;
    const idleLimit = 30; // Seconds
    let afkActive = false;
    let factInterval;
    let currentFactIndex = 0;

    // Create Overlay
    const overlay = document.createElement('div');
    overlay.className = 'afk-overlay';

    // Logo SVG (Reusing the new one)
    const logoSvg = `
        <svg class="star-icon" viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: none; stroke: url(#afkGradient); stroke-width: 1.5;">
            <defs>
                <linearGradient id="afkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4285F4;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D96570;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.2-.08-.42-.15-.65-.15-.49 0-.96.08-1.41.22l-.2-1.12c.96-.28 1.98-.45 3.04-.45.64 0 1.27.06 1.88.17C15.14 2 13.62 3 12 3z" fill="url(#afkGradient)" stroke="none"/>
        </svg>
    `;

    overlay.innerHTML = `
        <div class="afk-logo-container">${logoSvg}</div>
        <div class="afk-facts-container">
            <p id="afk-fact-text" class="afk-fact visible"></p>
        </div>
        <div class="afk-progress" id="afk-progress"></div>
    `;
    document.body.appendChild(overlay);

    const factText = overlay.querySelector('#afk-fact-text');
    const progressBar = overlay.querySelector('#afk-progress');

    // Show next fact function
    const rotateFact = () => {
        factText.classList.remove('visible');
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';

        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % facts.length;
            factText.innerHTML = facts[currentFactIndex];
            factText.classList.add('visible');

            // Restart progress bar
            setTimeout(() => {
                progressBar.style.transition = 'width 10s linear';
                progressBar.style.width = '100%';
            }, 100);

        }, 1000); // Wait for fade out
    };

    // Activate AFK
    const startAFK = () => {
        if (afkActive) return;
        afkActive = true;
        overlay.classList.add('active');

        // Initial fact
        factText.innerHTML = facts[currentFactIndex];
        progressBar.style.width = '100%'; // Start full or animate logic could be refined

        // Start Loop
        factInterval = setInterval(rotateFact, 10000); // 10 seconds per fact
    };

    // Deactivate AFK
    const stopAFK = () => {
        if (!afkActive) {
            idleTime = 0; // Just reset timer if not active
            return;
        }

        afkActive = false;
        overlay.classList.remove('active');
        clearInterval(factInterval);
        idleTime = 0;

        // Reset progress
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
    };

    // Idle Timer Loop
    setInterval(() => {
        // If overlay is hidden, increment time
        if (!afkActive) {
            idleTime++;
            if (idleTime >= idleLimit) {
                startAFK();
            }
        }
    }, 1000);

    // Event Listeners to reset
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, stopAFK);
    });
}
