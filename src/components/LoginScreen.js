import '../styles/login.css';

export function initLoginScreen(onLogin) {
  const container = document.createElement('div');
  container.className = 'login-container';
  container.innerHTML = `
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="login-card">
      <div class="logo-circle">
        <svg class="star-icon" viewBox="0 0 24 24" style="width: 40px; height: 40px; fill: none; stroke: url(#logoGradient); stroke-width: 2;">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4285F4;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D96570;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.2-.08-.42-.15-.65-.15-.49 0-.96.08-1.41.22l-.2-1.12c.96-.28 1.98-.45 3.04-.45.64 0 1.27.06 1.88.17C15.14 2 13.62 3 12 3z" fill="url(#logoGradient)" stroke="none"/>
        </svg>
      </div>
      <h1>Selene AI</h1>
      <p class="subtitle">Tu asistente inteligente personal</p>
      
      <button id="google-login-btn" class="google-btn">
        <svg class="google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <span>Continuar con Google</span>
      </button>
      
      <p class="error-msg hidden" id="login-error"></p>
    </div>
  `;

  const loginBtn = container.querySelector('#google-login-btn');
  const errorMsg = container.querySelector('#login-error');

  loginBtn.addEventListener('click', async () => {
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    errorMsg.classList.add('hidden');

    try {
      await onLogin();
    } catch (err) {
      console.error(err);
      errorMsg.textContent = `Error: ${err.code} - ${err.message}`;
      errorMsg.classList.remove('hidden');
      loginBtn.classList.remove('loading');
      loginBtn.disabled = false;
    }
  });

  return container;
}
