import { isAuthenticated, logout } from '../config/api.js';

const PROTECTED_PAGES = [
  'index.html',
  'transactions.html',
  'report.html',
  'profile.html',
  'financialAdv.html',
  'settings.html'
];

const PUBLIC_PAGES = [
  'signin.html',
  'signup.html',
  'landing.html'
];

let isRedirecting = false;

function isProtectedPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  return PROTECTED_PAGES.includes(currentPage);
}

function isPublicPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  return PUBLIC_PAGES.includes(currentPage);
}

function handleAuthRedirect() {
  
  if (isRedirecting) {
    return;
  }

  const authenticated = isAuthenticated();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (authenticated) {
    
    if (isPublicPage()) {
      isRedirecting = true;
      window.location.href = '/index.html';
    }
  } else {
    
    if (isProtectedPage()) {
      isRedirecting = true;
      window.location.href = '/signin.html';
    }
  }
}

function initAuthGuard() {

  handleAuthRedirect();
  
  window.addEventListener('popstate', () => {
    isRedirecting = false; 
    handleAuthRedirect();
  });
  
  setInterval(async () => {
    if (isProtectedPage() && !isAuthenticated()) {
      try {
        await logout();
      } catch (error) {
        console.error('Error en logout automático:', error);
        window.location.href = '/signin.html';
      }
    }
  }, 5 * 60 * 1000);
}

function updateUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userNameElement = document.getElementById('userName');
  const userEmailElement = document.getElementById('userEmail');
  
  if (userNameElement && userInfo.fullName) {
    userNameElement.textContent = userInfo.fullName;
  }
  
  if (userEmailElement && userInfo.email) {
    userEmailElement.textContent = userInfo.email;
  }
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await logout();
      } catch (error) {
        console.error('Error en logout:', error);

        window.location.href = '/signin.html';
      }
    });
  }
}

export { 
  initAuthGuard, 
  updateUserInfo, 
  setupLogoutButton, 
  isAuthenticated, 
  handleAuthRedirect 
}; 