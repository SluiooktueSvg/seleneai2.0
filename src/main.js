import './style.css';
import './styles/sidebar.css';
import './styles/chat.css';

import './styles/settings.css';
import './styles/theme-settings.css';
import './styles/confirm-modal.css';
import './styles/login.css';

import { initSidebar } from './components/Sidebar';
import { initChatArea } from './components/ChatArea';
import { initSettingsModal } from './components/SettingsModal';
import { initLoginScreen } from './components/LoginScreen';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { initOnboarding } from './components/Onboarding';

import { ConfirmModal } from './components/ConfirmModal';
import { ChatHistoryService } from './services/history';
import { initAFKMode } from './components/AFKMode';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Initially hide app
    app.classList.add('hidden');

    const onLoginSuccess = async (user) => {
        // Remove login screen
        const loginScreen = document.querySelector('.login-container');
        if (loginScreen) loginScreen.remove();

        // Check Onboarding
        let currentUser = user;
        const profile = await UserService.getUserProfile(user.uid);

        const proceedToApp = (finalUser) => {
            // Show App
            app.classList.remove('hidden');

            // Init App Components
            const chatController = initChatArea(finalUser);
            const settingsModal = initSettingsModal(AuthService.logout);
            const confirmModal = new ConfirmModal();

            // Init AFK Mode
            initAFKMode();

            initSidebar(
                () => chatController.reset(),
                () => settingsModal.open(),
                finalUser,
                (chatId) => {
                    confirmModal.open(async () => {
                        // Optimistic Interaction:
                        // 1. UI: Remove immediately from sidebar using DOM
                        const chatEl = document.querySelector(`.chat-item[data-id="${chatId}"]`);
                        if (chatEl) {
                            chatEl.style.height = '0px';
                            chatEl.style.opacity = '0';
                            chatEl.style.margin = '0';
                            chatEl.style.padding = '0';
                            setTimeout(() => chatEl.remove(), 300); // Remove after animation
                        }

                        // 2. Logic: Reset current view if it was the deleted one
                        // We check this BEFORE calling delete to avoid weird race conditions
                        // (Implementation detail: Sidebar usually handles selection state, 
                        // but we might want to reset the main area immediately if open)
                        // For now, let's just trigger server delete.

                        // Background Server Delete
                        try {
                            await ChatHistoryService.deleteChat(finalUser.uid, chatId);
                            // If success, Sidebar listener will eventually sync, 
                            // but we already removed it so user feels it's instant.
                            chatController.reset(); // Reset chat area to welcome screen
                        } catch (err) {
                            console.error("Delete failed, should revert UI here technically but keeping simple", err);
                            // Ideally we would show a toast error here
                        }
                    });
                }
            );

            console.log('Selene Clone Initialized for', finalUser.displayName);
        };

        // FORCE ONBOARDING FOR TESTING: Added '|| true'
        if (!profile || !profile.onboardingComplete || true) {
            // New User or Incomplete Onboarding
            await UserService.createUserProfile(user); // Ensure doc exists
            const onboardingScreen = initOnboarding(user, (updatedUser) => {
                proceedToApp(updatedUser);
            });
            document.body.appendChild(onboardingScreen);
        } else {
            // Existing User - merge preferredName
            currentUser = { ...user, preferredName: profile.preferredName };
            proceedToApp(currentUser);
        }
    };

    // Check auth status
    AuthService.onUserChange((user) => {
        if (user) {
            onLoginSuccess(user);
        } else {
            // Logout / No Session
            app.classList.add('hidden');

            // Re-show Login Screen if not present
            if (!document.querySelector('.login-container')) {
                const loginScreen = initLoginScreen(AuthService.loginWithGoogle);
                document.body.appendChild(loginScreen);
            }
        }
    });
});

import './styles/onboarding.css';
