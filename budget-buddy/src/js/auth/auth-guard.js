import { isAuthenticated, logout } from '../config/api.js';

// Páginas que requieren autenticación
const PROTECTED_PAGES = [
  'index.html',
  'transactions.html',
  'report.html',
  'profile.html',
  'financialAdv.html'
];

// Páginas públicas (no requieren autenticación)
const PUBLIC_PAGES = [
  'signin.html',
  'signup.html',
  'landing.html'
];

// Variable para evitar bucles de redirección
let isRedirecting = false;

// Función para verificar si la página actual requiere autenticación
function isProtectedPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  return PROTECTED_PAGES.includes(currentPage);
}

// Función para verificar si la página actual es pública
function isPublicPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  return PUBLIC_PAGES.includes(currentPage);
}

// Función para redirigir según el estado de autenticación
function handleAuthRedirect() {
  // Evitar bucles de redirección
  if (isRedirecting) {
    return;
  }

  const authenticated = isAuthenticated();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (authenticated) {
    // Si está autenticado y está en una página pública, redirigir al dashboard
    if (isPublicPage()) {
      isRedirecting = true;
      window.location.href = '/index.html';
    }
  } else {
    // Si no está autenticado y está en una página protegida, redirigir al login
    if (isProtectedPage()) {
      isRedirecting = true;
      window.location.href = '/signin.html';
    }
  }
}

// Función para inicializar el guard de autenticación
function initAuthGuard() {
  // Verificar autenticación al cargar la página
  handleAuthRedirect();
  
  // Verificar autenticación cuando cambie la URL
  window.addEventListener('popstate', () => {
    isRedirecting = false; // Reset flag on navigation
    handleAuthRedirect();
  });
  
  // Verificar autenticación cada 5 minutos
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

// Función para mostrar información del usuario en el header
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

// Función para configurar el botón de logout
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await logout();
      } catch (error) {
        console.error('Error en logout:', error);
        // Forzar redirección en caso de error
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