import { SELENE_RELEASE, SELENE_RELEASE_HISTORY } from '../config/seleneReleaseNotes';

const STORAGE_KEY = 'selene-release-seen-version';

function getSeenVersion() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function setSeenVersion(version) {
  try {
    localStorage.setItem(STORAGE_KEY, version);
  } catch {
    // Ignore storage failures.
  }
}

function buildReleaseSections(releases) {
  return releases.map((release, index) => `
    <section class="update-release-section ${index === 0 ? 'is-latest' : ''}">
      <div class="update-release-head">
        <h3 class="update-release-heading">${release.version}</h3>
        <p class="update-release-date">${release.releaseDate}</p>
      </div>
      <ul class="update-banner-list">
        ${release.highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `).join('');
}

function createUpdateModal({ releases, persistVersion }) {
  const overlay = document.createElement('div');
  overlay.className = 'update-banner-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'update-banner-title');

  overlay.innerHTML = `
    <div class="update-banner-modal">
      <div class="update-banner-badge">New Update</div>
      <h2 id="update-banner-title" class="update-banner-title">${SELENE_RELEASE.title}</h2>
      <div class="update-banner-meta">
        <p class="update-banner-version">Version ${SELENE_RELEASE.version}</p>
        <p class="update-banner-date">${SELENE_RELEASE.releaseDate}</p>
      </div>
      <div class="update-release-history">
        ${buildReleaseSections(releases)}
      </div>
      <button type="button" class="update-banner-accept">Accept</button>
    </div>
  `;

  const acceptBtn = overlay.querySelector('.update-banner-accept');

  const closeBanner = () => {
    if (persistVersion) {
      setSeenVersion(persistVersion);
    }
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 280);
  };

  acceptBtn.addEventListener('click', closeBanner);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.contains(overlay)) {
      closeBanner();
    }
  }, { once: true });

  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.classList.add('open');
  });

  return {
    destroy: () => overlay.remove()
  };
}

export function initUpdateBanner() {
  if (getSeenVersion() === SELENE_RELEASE.version) {
    return { destroy: () => {} };
  }

  return createUpdateModal({
    releases: [SELENE_RELEASE],
    persistVersion: SELENE_RELEASE.version
  });
}

export function openChangelogModal() {
  return createUpdateModal({
    releases: SELENE_RELEASE_HISTORY,
    persistVersion: null
  });
}
