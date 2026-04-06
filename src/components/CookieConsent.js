const STORAGE_KEY = 'selene-cookie-consent-v1';
const CONSENT_EVENT = 'selene-cookie-consent-updated';

export function getStoredCookieConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'essential' ? value : null;
  } catch {
    return null;
  }
}

function notifyConsent(choice) {
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { choice } }));
}

export function applyCookieConsent(choice) {
  const normalizedChoice = choice === 'accepted' ? 'accepted' : 'essential';

  try {
    localStorage.setItem(STORAGE_KEY, normalizedChoice);
  } catch {
    // Ignore storage failures and continue with in-memory consent.
  }

  window.SELENE_COOKIE_CONSENT = normalizedChoice;
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = normalizedChoice === 'accepted' ? 0 : 1;
  window.adsbygoogle.pauseAdRequests = 0;

  notifyConsent(normalizedChoice);
}

export function initCookieConsent() {
  const existing = document.getElementById('cookie-consent-banner');
  if (existing) {
    return { destroy: () => existing.remove() };
  }

  const storedChoice = getStoredCookieConsent();
  if (storedChoice) {
    applyCookieConsent(storedChoice);
    return { destroy: () => {} };
  }

  const banner = document.createElement('aside');
  banner.id = 'cookie-consent-banner';
  banner.className = 'cookie-consent-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Preferencias de cookies');

  banner.innerHTML = `
    <div class="cookie-consent-copy">
      <strong>Privacidad y anuncios</strong>
      <p>
        Selene usa almacenamiento local, funciones de autenticacion y puede mostrar anuncios de Google AdSense.
        Puedes aceptar anuncios personalizados o continuar solo con cookies esenciales. Mas detalles en nuestra
        <a href="/privacy">Politica de Privacidad</a>.
      </p>
    </div>
    <div class="cookie-consent-actions">
      <button type="button" class="btn btn-outline cookie-essential-btn">Solo esenciales</button>
      <button type="button" class="btn btn-primary cookie-accept-btn">Aceptar</button>
    </div>
  `;

  const essentialBtn = banner.querySelector('.cookie-essential-btn');
  const acceptBtn = banner.querySelector('.cookie-accept-btn');

  const handleChoice = (choice) => {
    applyCookieConsent(choice);
    banner.classList.add('is-hiding');
    setTimeout(() => banner.remove(), 220);
  };

  essentialBtn.addEventListener('click', () => handleChoice('essential'));
  acceptBtn.addEventListener('click', () => handleChoice('accepted'));

  document.body.appendChild(banner);

  return {
    destroy: () => banner.remove()
  };
}

export { CONSENT_EVENT };
