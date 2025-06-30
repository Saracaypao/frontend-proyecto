// import "jsvectormap/dist/jsvectormap.min.css";
// import "flatpickr/dist/flatpickr.min.css";
// import "dropzone/dist/dropzone.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import Dropzone from "dropzone";

// Importar servicios y utilidades
import { initAuthGuard, updateUserInfo, setupLogoutButton, isAuthenticated } from "./auth/auth-guard.js";
import transactionService from "./services/transactionService.js";
import categoryService from "./services/categoryService.js";
import reportService from "./services/reportService.js";

// Importar componentes
import chart03 from "./components/charts/chart-03";
import chart01 from "./components/charts/chart-01";
import { loadCurrentMonthMetrics } from "./components/dashboard-metrics";
import { renderTransactionTable, renderRecentTransactions } from "./components/table-01";
import transactionsComponent from "./pages/transactions.js";
import { renderFinancialTable } from "./components/table-02.js";
import loadSigninPage from "./pages/signIn";
import loadSignupPage from "./pages/signUp";
import loadLandingPage from "./pages/landing";
import "./components/calendar-init.js";
import "./components/image-resize";

// Importaciones de páginas
import reportComponent from './pages/report.js';
import financialAdviceComponent from './pages/financialAdvice.js';

// Configurar Alpine.js
Alpine.plugin(persist);
window.Alpine = Alpine;

// Registrar componentes globales
Alpine.data('transactionsComponent', transactionsComponent);
Alpine.data('reportComponent', reportComponent);
Alpine.data('financialAdviceComponent', financialAdviceComponent);

// Inicializar Alpine.js
Alpine.start();

// Función para inicializar la aplicación
async function initializeApp() {
  try {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Verificar si estamos en una página pública
    const publicPages = ['signin.html', 'signup.html', 'landing.html'];
    const isPublicPage = publicPages.includes(currentPage);
    
    // Solo verificar autenticación si no estamos en una página pública
    if (!isPublicPage) {
      if (!isAuthenticated()) {
        window.location.href = '/signin.html';
        return;
      }
    }
    
    // Inicializar el guard de autenticación (esto manejará las redirecciones)
    initAuthGuard();
    
    // Solo inicializar componentes de la aplicación si el usuario está autenticado
    if (isAuthenticated()) {
      // Actualizar información del usuario en el header
      updateUserInfo();
      
      // Configurar botón de logout
      setupLogoutButton();
      
      // Cargar categorías si estamos en una página que las necesita
      if (['index.html', 'transactions.html', 'report.html'].includes(currentPage)) {
        await categoryService.loadCategories();
      }
      
      // Inicializar componentes específicos de la página
      initializePageComponents(currentPage);
    } else {
      // Si estamos en una página pública, inicializar solo esa página
      if (isPublicPage) {
        initializePageComponents(currentPage);
      }
    }
    
  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

// Función para inicializar componentes específicos de cada página
function initializePageComponents(page) {
  switch (page) {
    case 'index.html':
      initializeDashboard();
      break;
    case 'transactions.html':
      initializeTransactionsPage();
      break;
    case 'report.html':
      initializeReportPage();
      break;
    case 'signin.html':
      loadSigninPage();
      break;
    case 'signup.html':
      loadSignupPage();
      break;
    case 'landing.html':
      loadLandingPage();
      break;
  }
}

// Inicializar dashboard
async function initializeDashboard() {
  try {
    // Cargar métricas del mes actual
    await loadCurrentMonthMetrics();
    
    // Cargar transacciones recientes
    const latestTransactions = await transactionService.getLatestTransactions();
    if (latestTransactions.length > 0) {
      const formattedTransactions = latestTransactions.map(t => transactionService.formatTransactionForUI(t));
      renderRecentTransactions(formattedTransactions);
    } else {
      renderRecentTransactions([]);
    }
    
    // Inicializar gráficos
    chart01();
    chart03();
    
  } catch (error) {
    console.error('Error inicializando dashboard:', error);
    // Mostrar mensaje de error en las transacciones recientes
    renderRecentTransactions([]);
  }
}

// Inicializar página de transacciones
async function initializeTransactionsPage() {
  try {
    // Cargar transacciones
    const transactions = await transactionService.loadTransactions();
    if (transactions.length > 0) {
      window.transactions = transactions.map(t => transactionService.formatTransactionForUI(t));
      renderTransactionTable(window.transactions, 1, 5);
    }
    
    // Inicializar componente de transacciones
    if (typeof transactionsComponent === 'function') {
      transactionsComponent();
    }
    
  } catch (error) {
    console.error('Error inicializando página de transacciones:', error);
  }
}

// Inicializar página de reportes
async function initializeReportPage() {
  try {
    // El componente reportComponent ya está registrado en Alpine.js
    // y se inicializará automáticamente cuando Alpine.js procese el DOM
  } catch (error) {
    console.error('Error inicializando página de reportes:', error);
  }
}

// Inicializar Dropzone
const dropzoneArea = document.querySelectorAll("#demo-upload");
if (dropzoneArea.length) {
  let myDropzone = new Dropzone("#demo-upload", { url: "/file/post" });
}

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Exportar servicios para uso global
window.transactionService = transactionService;
window.categoryService = categoryService;
window.reportService = reportService;

// Hacer que los componentes estén disponibles globalmente
window.reportComponent = reportComponent;
window.transactionsComponent = transactionsComponent;
window.financialAdviceComponent = financialAdviceComponent;

// Init flatpickr
flatpickr(".datepicker", {
  mode: "range",
  static: true,
  monthSelectorType: "static",
  dateFormat: "M j, Y",
  defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
  prevArrow:
    '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.25 6L9 12.25L15.25 18.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  nextArrow:
    '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 19L15 12.75L8.75 6.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  onReady: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
    const customClass = instance.element.getAttribute("data-class");
    instance.calendarContainer.classList.add(customClass);
  },
  onChange: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    instance.element.value = dateStr.replace("to", "-");
  },
});

// Get the current year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// For Copy//
document.addEventListener("DOMContentLoaded", () => {
  const copyInput = document.getElementById("copy-input");
  if (copyInput) {
    // Select the copy button and input field
    const copyButton = document.getElementById("copy-button");
    const copyText = document.getElementById("copy-text");
    const websiteInput = document.getElementById("website-input");

    // Event listener for the copy button
    copyButton.addEventListener("click", () => {
      // Copy the input value to the clipboard
      navigator.clipboard.writeText(websiteInput.value).then(() => {
        // Change the text to "Copied"
        copyText.textContent = "Copied";

        // Reset the text back to "Copy" after 2 seconds
        setTimeout(() => {
          copyText.textContent = "Copy";
        }, 2000);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (!searchInput || !searchButton) return; // Prevent error if not present

  // Function to focus the search input
  function focusSearchInput() {
    searchInput.focus();
  }

  // Add click event listener to the search button
  searchButton.addEventListener("click", focusSearchInput);

  // Add keyboard event listener for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  document.addEventListener("keydown", function (event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault(); // Prevent the default browser behavior
      focusSearchInput();
    }
  });

  // Add keyboard event listener for "/" key
  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault(); // Prevent the "/" character from being typed
      focusSearchInput();
    }
  });
});
