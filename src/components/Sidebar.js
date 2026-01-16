import { ChatHistoryService } from '../services/history';

export function initSidebar(onNewChat, onOpenSettings, user, onDeleteChat) {
  const sidebar = document.getElementById('sidebar');
  // ... (rest of code)

  // Default values or user data
  const photoURL = user?.photoURL || 'https://via.placeholder.com/32';
  const email = user?.email || 'usuario@example.com';

  // Mobile Toggle Logic
  if (!document.getElementById('mobile-menu-toggle')) {
    const mobileBtn = document.createElement('button');
    mobileBtn.id = 'mobile-menu-toggle';
    mobileBtn.className = 'mobile-menu-toggle';
    mobileBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
    document.body.appendChild(mobileBtn);

    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        e.target !== mobileBtn &&
        !mobileBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <button class="menu-btn" aria-label="Menu">
        <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
      </button>
      <button class="new-chat-btn" id="new-chat-btn">
        <svg viewBox="0 0 24 24" class="plus-icon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
        <span class="collapsed-hide">Nuevo chat</span>
      </button>
    </div>
    
    <div class="recent-chats">
      <div class="section-title collapsed-hide">Recientes</div>
      <div id="chat-list-container">
          <!-- Real chats will be injected here -->
          <div class="loading-chats collapsed-hide">
             <div class="skeleton-loader">
               <div class="skeleton-item"></div>
               <div class="skeleton-item"></div>
               <div class="skeleton-item"></div>
             </div>
          </div>
      </div>
    </div>
    
    <div class="sidebar-footer">
       <button class="footer-btn user-profile-btn">
        <img src="${photoURL}" alt="Profile" class="user-avatar-img">
        <div class="user-info collapsed-hide">
             <span class="user-email">${email}</span>
        </div>
      </button>
      <button class="footer-btn" id="settings-btn">
        <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
        <span class="collapsed-hide">Ajustes</span>
      </button>
    </div>
  `;

  // --- Logic ---
  const menuBtn = sidebar.querySelector('.menu-btn');
  const settingsBtn = sidebar.querySelector('#settings-btn');
  const newChatBtn = sidebar.querySelector('#new-chat-btn');
  const chatListContainer = sidebar.querySelector('#chat-list-container');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  newChatBtn.addEventListener('click', () => {
    // Remove active class from all items
    const items = sidebar.querySelectorAll('.chat-item');
    items.forEach(i => i.classList.remove('active'));
    onNewChat(); // Trigger new chat logic
  });

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      onOpenSettings();
    });
  }

  // Real Chat History Subscription
  if (user && user.uid) {
    ChatHistoryService.subscribeToChatList(user.uid, (chats) => {
      chatListContainer.innerHTML = ''; // Clear loading/old

      if (chats.length === 0) {
        chatListContainer.innerHTML = '<div style="padding:10px; font-size:12px; color:#888" class="collapsed-hide">No hay chats recientes</div>';
        return;
      }

      chats.forEach((chat, index) => {
        const btn = document.createElement('button');
        btn.className = 'chat-item';
        btn.dataset.id = chat.id; // Store ID

        // Stagger Animation
        btn.style.animationDelay = `${index * 0.05}s`;

        btn.innerHTML = `
                  <div class="chat-info-row">
                      <svg viewBox="0 0 24 24" class="chat-icon"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
                      <span class="chat-title collapsed-hide">${chat.title}</span>
                  </div>
                  <div class="chat-actions collapsed-hide">
                      <button class="delete-chat-btn" title="Eliminar conversación">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                  </div>
              `;

        // Click on Chat Item
        btn.addEventListener('click', (e) => {
          // Prevent triggering if clicked on delete button
          if (e.target.closest('.delete-chat-btn')) return;

          // UI Active State
          const all = sidebar.querySelectorAll('.chat-item');
          all.forEach(x => x.classList.remove('active'));
          btn.classList.add('active');

          const event = new CustomEvent('load-chat', { detail: { chatId: chat.id } });
          document.dispatchEvent(event);
        });

        // Click on Delete Button
        const deleteBtn = btn.querySelector('.delete-chat-btn');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubble
            if (onDeleteChat) onDeleteChat(chat.id);
          });
        }

        chatListContainer.appendChild(btn);
      });
    });
  }
}
