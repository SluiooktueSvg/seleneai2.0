import './style.css';
import './styles/login.css';
import './styles/onboarding.css';
import './styles/chat.css';
import './styles/sidebar.css';
import './styles/cookie-consent.css';
import './styles/update-banner.css';

// Componentes de la App
import { initSidebar } from './components/Sidebar';
import { initChatArea } from './components/ChatArea';
import { initSettingsModal } from './components/SettingsModal';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { initOnboarding } from './components/Onboarding';
import { ConfirmModal } from './components/ConfirmModal';
import { ChatHistoryService } from './services/history';
import { initAFKMode } from './components/AFKMode';
import { PresenceService } from './services/presence';
import { initCookieConsent } from './components/CookieConsent';
import { initUpdateBanner } from './components/UpdateBanner';

// Componentes de la LANDING
import { Router } from './landing_comp/router.js';
import { HomePage, FeaturesPage, PrivacyPage, TermsPage, ContactPage } from './landing_comp/pages.js';

document.addEventListener('DOMContentLoaded', () => {
    let activeAppCleanup = null;
    initCookieConsent();
    initUpdateBanner();

    const routes = {
        '/': HomePage,
        '/features': FeaturesPage,
        '/privacy': PrivacyPage,
        '/terms': TermsPage,
        '/contact': ContactPage,
    };

    const landingRouter = new Router(routes);
    landingRouter.setLoginHandler(() => AuthService.loginWithGoogle());


    const cleanupActiveApp = () => {
        if (activeAppCleanup) {
            activeAppCleanup();
            activeAppCleanup = null;
        }
    };

    const proceedToApp = (finalUser) => {
        cleanupActiveApp();

        document.body.classList.remove('landing-active');
        const landingElements = document.querySelectorAll('header, footer, main, .login-container');
        landingElements.forEach((el) => el.remove());

        const app = document.getElementById('app');
        app.classList.remove('hidden');
        app.innerHTML = `
            <div class="main-layout app-active">
                <aside id="sidebar" class="sidebar"></aside>
                <main id="chat-container" class="chat-container"></main>
            </div>
        `;

        setTimeout(() => {
            try {
                PresenceService.init(finalUser.uid, {
                    displayName: finalUser.displayName || finalUser.preferredName || 'Usuario',
                    email: finalUser.email || '',
                    photoURL: finalUser.photoURL || ''
                });

                const chatController = initChatArea(finalUser);
                const settingsModal = initSettingsModal(() => AuthService.logout());
                const confirmModal = new ConfirmModal();
                initAFKMode();

                const sidebarController = initSidebar(
                    () => chatController.reset(),
                    () => settingsModal.open(),
                    finalUser,
                    async (chatId) => {
                        confirmModal.open(async () => {
                            try {
                                await ChatHistoryService.deleteChat(finalUser.uid, chatId);
                                chatController.reset();
                            } catch (err) {
                                console.error(err);
                            }
                        });
                    }
                );

                activeAppCleanup = () => {
                    chatController?.destroy?.();
                    sidebarController?.destroy?.();
                };
            } catch (error) {
                console.error('Error critico al arrancar Elai:', error);
            }
        }, 50);
    };

    const onLoginSuccess = async (user) => {
        const profile = await UserService.getUserProfile(user.uid);

        if (!profile || !profile.onboardingComplete) {
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.classList.add('hidden');

            await UserService.createUserProfile(user);
            const onboardingScreen = initOnboarding(user, (updatedUser) => {
                proceedToApp(updatedUser);
            });
            document.body.appendChild(onboardingScreen);
        } else {
            proceedToApp({ ...user, preferredName: profile.preferredName });
        }
    };

    AuthService.onUserChange(async (user) => {
        const app = document.getElementById('app');

        if (user) {
            await onLoginSuccess(user);
        } else {
            cleanupActiveApp();

            const onboarding = document.querySelector('.onboarding-screen');
            if (onboarding) onboarding.remove();

            app.classList.add('hidden');
            document.body.classList.add('landing-active');

            landingRouter.init();
            PresenceService.cleanup().catch(() => { });
        }
    });
});
