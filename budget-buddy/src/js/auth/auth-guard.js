import { isAuthenticated, logout } from '../config/api.js';

const PROTECTED_PAGES = [
  'index.html',
  'transactions.html',
  'report.html',
  'profile.html',
  'financialAdv.html',
  'graficos.html',
  'settings.html'
];

const PUBLIC_PAGES = [
  'signin.html',
  'signup.html',
  'landing.html'
];

let isRedirecting = false;

function getRoleFromStorageOrToken() {
  try {
    const userInfoRaw = localStorage.getItem('userInfo');
    if (userInfoRaw) {
      const userInfo = JSON.parse(userInfoRaw);
      if (userInfo && userInfo.role) return userInfo.role;
    }
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    }
  } catch (e) {
    console.warn('No se pudo determinar el rol desde storage/token', e);
  }
  return null;
}

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
      const role = getRoleFromStorageOrToken();
      const target = role === 'ADVISOR' ? '/financialAdv.html' : '/index.html';
      window.location.href = target;
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