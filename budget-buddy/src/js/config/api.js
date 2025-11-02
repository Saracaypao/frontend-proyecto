// api url
const API_CONFIG = {
  BASE_URL: 'http://localhost:8081',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/users/register',
      LOGOUT: '/auth/logout'
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/update',
      CHANGE_PASSWORD: '/users/change-password'
    },
    TRANSACTIONS: {
      LIST: '/transactions',
      CREATE: '/transactions',
      GET_BY_ID: (id) => `/transactions/${id}`,
      UPDATE: (id) => `/transactions/${id}`,
      DELETE: (id) => `/transactions/${id}`,
      FILTER: '/transactions/filter',
      LATEST: '/transactions/latest',
      SUMMARY_CURRENT_MONTH: '/transactions/summary/current-month',
      SUMMARY_LAST_6_MONTHS: '/transactions/summary/last-6-months'
    },
    CATEGORIES: {
      LIST: '/categories',
      CREATE: '/categories',
      UPDATE: (id) => `/categories/${id}`,
      DELETE: (id) => `/categories/${id}`
    },
    REPORTS: {
      GENERAL: '/report',
      BY_YEAR: '/report',
      BY_MONTH: '/report',
      BY_RANGE: '/report/range'
    },
    ADVICE: {
      CREATE_COMMENT: '/comments',
      GET_PUBLIC_TRANSACTIONS: '/transactions/public',
      GET_COMMENTS: (transactionId) => `/comments/transaction/${transactionId}`,
      CREATE_REQUEST: '/advice-requests',
      GET_PENDING_REQUESTS: '/advice-requests/pending',
      GET_MY_REQUESTS: '/advice-requests/my-requests',
      GET_MY_ASSIGNMENTS: '/advice-requests/my-assignments',
      ACCEPT_REQUEST: (requestId) => `/advice-requests/${requestId}/accept`,
      START_ADVICE: (requestId) => `/advice-requests/${requestId}/start`,
      COMPLETE_REQUEST: (requestId) => `/advice-requests/${requestId}/complete`,
      CANCEL_REQUEST: (requestId) => `/advice-requests/${requestId}/cancel`,
      GET_REPORT: (requestId) => `/advice-requests/${requestId}/get-report`,
      PROVIDE_ADVICE: (requestId) => `/advice-requests/${requestId}/advice`
    }
  }
};

async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  const token = localStorage.getItem('jwtToken');
  if (token) {
    finalOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

function isAuthenticated() {
  return !!localStorage.getItem('jwtToken');
}

function getUserInfo() {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

async function logout() {
  try {

    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
          method: 'POST'
        });
      } catch (error) {
        console.warn('No se pudo notificar logout al backend:', error);
      }
    }
    
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    
    sessionStorage.clear();
    
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    window.location.href = '/signin.html';
  } catch (error) {
    console.error('Error durante el logout:', error);

    window.location.replace('/signin.html');
  }
}

export { API_CONFIG, apiRequest, isAuthenticated, getUserInfo, logout }; 