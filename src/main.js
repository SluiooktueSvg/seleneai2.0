import './style.css';
import './styles/sidebar.css';
import './styles/chat.css';

import './styles/settings.css';
import './styles/theme-settings.css';
import './styles/login.css';

import { initSidebar } from './components/Sidebar';
import { initChatArea } from './components/ChatArea';
import { initSettingsModal } from './components/SettingsModal';
import { initLoginScreen } from './components/LoginScreen';
import { AuthService } from './services/auth';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Initially hide app
    app.classList.add('hidden');

    const onLoginSuccess = (user) => {
        // Remove login screen
        const loginScreen = document.querySelector('.login-container');
        if (loginScreen) loginScreen.remove();

        // Show App
        app.classList.remove('hidden');

        // Init App Components
        const chatController = initChatArea(user);
        const settingsModal = initSettingsModal();

        initSidebar(
            () => chatController.reset(),
            () => settingsModal.open(),
            user // Pass user to sidebar
        );

        console.log('Selene Clone Initialized for', user.displayName);
    };

    // Check auth status
    AuthService.onUserChange((user) => {
        if (user) {
            onLoginSuccess(user);
        } else {
            // Show Login Screen
            const loginScreen = initLoginScreen(AuthService.loginWithGoogle);
            document.body.appendChild(loginScreen);
        }
    });
});
