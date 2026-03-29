import { rtdb } from '../firebase-config';
import { ref, set, onValue, onDisconnect, serverTimestamp } from 'firebase/database';

/**
 * Presence Service - Sistema de "En línea / Última vez" como WhatsApp
 * Usa Firebase Realtime Database para detectar desconexiones automáticamente
 */
export const PresenceService = {
    // Reference to the user's status in RTDB
    userStatusRef: null,
    
    // Listener cleanup function
    connectedRefUnsubscribe: null,

    /**
     * Inicializa el sistema de presencia para un usuario
     * @param {string} userId - UID del usuario
     */
    init(userId) {
        if (!userId) return;

        // Reference to this user's status node
        this.userStatusRef = ref(rtdb, `/status/${userId}`);

        // Reference to the special '.info/connected' path
        // This is a special location in RTDB that is true when connected
        const connectedRef = ref(rtdb, '.info/connected');

        // Status when user is online
        const isOnlineStatus = {
            isOnline: true,
            lastSeen: serverTimestamp(),
            lastActive: serverTimestamp()
        };

        // Status when user is offline (set by onDisconnect)
        const isOfflineStatus = {
            isOnline: false,
            lastSeen: serverTimestamp()
        };

        // Listen for connection state changes
        this.connectedRefUnsubscribe = onValue(connectedRef, (snapshot) => {
            // If not connected, don't do anything
            if (snapshot.val() === false) {
                return;
            }

            // When connected (or reconnected), set up onDisconnect hook
            // This will run on Firebase servers when user disconnects
            onDisconnect(this.userStatusRef)
                .set(isOfflineStatus)
                .then(() => {
                    // Now set the user as online
                    set(this.userStatusRef, isOnlineStatus);
                });
        });

        // Update lastActive periodically while user is active
        this.startActivityTracker();

        // Listen for page visibility changes
        this.setupVisibilityListener(userId);

        // Listen for beforeunload to set offline status
        this.setupBeforeUnloadListener();
    },

    /**
     * Actualiza lastActive cada 60 segundos mientras el usuario está activo
     */
    startActivityTracker() {
        // Update activity on user interactions
        const updateActivity = () => {
            if (this.userStatusRef) {
                set(this.userStatusRef, {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                    lastActive: serverTimestamp()
                });
            }
        };

        // Throttle activity updates (max once per 60 seconds)
        let lastUpdate = 0;
        const throttledUpdate = () => {
            const now = Date.now();
            if (now - lastUpdate > 60000) { // 60 seconds
                lastUpdate = now;
                updateActivity();
            }
        };

        // Listen for user activity events
        ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
            document.addEventListener(event, throttledUpdate, { passive: true });
        });
    },

    /**
     * Configura listener para cuando la pestaña se oculta/muestra
     */
    setupVisibilityListener(userId) {
        document.addEventListener('visibilitychange', () => {
            if (!this.userStatusRef) return;

            if (document.visibilityState === 'hidden') {
                // User switched tabs or minimized - mark as "away" but still online
                set(this.userStatusRef, {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                    isAway: true
                });
            } else {
                // User came back
                set(this.userStatusRef, {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                    lastActive: serverTimestamp(),
                    isAway: false
                });
            }
        });
    },

    /**
     * Configura listener para cuando el usuario cierra la pestaña
     */
    setupBeforeUnloadListener() {
        window.addEventListener('beforeunload', () => {
            if (this.userStatusRef) {
                // Intentar marcar como offline antes de cerrar
                // Nota: Esto no siempre funciona, por eso onDisconnect es importante
                set(this.userStatusRef, {
                    isOnline: false,
                    lastSeen: serverTimestamp()
                });
            }
        });
    },

    /**
     * Obtiene el estado de presencia de un usuario específico
     * @param {string} userId - UID del usuario a observar
     * @param {function} callback - Función llamada cuando cambia el estado
     * @returns {function} Función para cancelar la suscripción
     */
    subscribeToUserStatus(userId, callback) {
        const userStatusRef = ref(rtdb, `/status/${userId}`);
        
        const unsubscribe = onValue(userStatusRef, (snapshot) => {
            const status = snapshot.val();
            if (status) {
                callback({
                    isOnline: status.isOnline || false,
                    lastSeen: status.lastSeen ? new Date(status.lastSeen) : null,
                    isAway: status.isAway || false
                });
            } else {
                callback({
                    isOnline: false,
                    lastSeen: null,
                    isAway: false
                });
            }
        });

        return unsubscribe;
    },

    /**
     * Formatea el estado de presencia para mostrar en UI
     * @param {object} status - Estado de presencia
     * @returns {string} Texto formateado ("En línea", "Última vez hoy a las 14:30", etc.)
     */
    formatStatus(status) {
        if (!status) return '';

        if (status.isOnline) {
            return status.isAway ? 'En línea (ausente)' : 'En línea';
        }

        if (!status.lastSeen) return 'Desconectado';

        const lastSeen = status.lastSeen instanceof Date ? status.lastSeen : new Date(status.lastSeen);
        const now = new Date();
        const diffMs = now - lastSeen;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        // Format time
        const timeStr = lastSeen.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        // Today
        if (diffDays === 0) {
            if (diffMins < 1) return 'Última vez hace un momento';
            if (diffMins < 60) return `Última vez hace ${diffMins} min`;
            return `Última vez hoy a las ${timeStr}`;
        }

        // Yesterday
        if (diffDays === 1) {
            return `Última vez ayer a las ${timeStr}`;
        }

        // This week
        if (diffDays < 7) {
            const dayName = lastSeen.toLocaleDateString('es-ES', { weekday: 'long' });
            return `Última vez el ${dayName} a las ${timeStr}`;
        }

        // Older
        const dateStr = lastSeen.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short' 
        });
        return `Última vez el ${dateStr}`;
    },

    /**
     * Marca al usuario como desconectado (para logout manual)
     */
    async goOffline() {
        if (this.userStatusRef) {
            await set(this.userStatusRef, {
                isOnline: false,
                lastSeen: serverTimestamp()
            });
        }
    },

    /**
     * Limpia los listeners y marca como offline
     */
    async cleanup() {
        await this.goOffline();
        if (this.connectedRefUnsubscribe) {
            this.connectedRefUnsubscribe();
        }
        this.userStatusRef = null;
    }
};
