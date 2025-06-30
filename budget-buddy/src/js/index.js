
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import Dropzone from "dropzone";

import { initAuthGuard, updateUserInfo, setupLogoutButton, isAuthenticated } from "./auth/auth-guard.js";
import transactionService from "./services/transactionService.js";
import categoryService from "./services/categoryService.js";
import reportService from "./services/reportService.js";

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

import reportComponent from './pages/report.js';
import financialAdviceComponent from './pages/financialAdvice.js';

Alpine.plugin(persist);
window.Alpine = Alpine;

Alpine.data('transactionsComponent', transactionsComponent);
Alpine.data('reportComponent', reportComponent);
Alpine.data('financialAdviceComponent', financialAdviceComponent);

Alpine.start();

async function initializeApp() {
  try {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const publicPages = ['signin.html', 'signup.html', 'landing.html'];
    const isPublicPage = publicPages.includes(currentPage);
    
    if (!isPublicPage) {
      if (!isAuthenticated()) {
        window.location.href = '/signin.html';
        return;
      }
    }
    
    initAuthGuard();
    
    if (isAuthenticated()) {

      updateUserInfo();
      
      setupLogoutButton();
      
      if (['index.html', 'transactions.html', 'report.html'].includes(currentPage)) {
        await categoryService.loadCategories();
      }
      
      initializePageComponents(currentPage);
    } else {
      if (isPublicPage) {
        initializePageComponents(currentPage);
      }
    }
    
  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

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

async function initializeDashboard() {
  try {
    await loadCurrentMonthMetrics();

    const latestTransactions = await transactionService.getLatestTransactions();
    if (latestTransactions.length > 0) {
      const formattedTransactions = latestTransactions.map(t => transactionService.formatTransactionForUI(t));
      renderRecentTransactions(formattedTransactions);
    } else {
      renderRecentTransactions([]);
    }
    
    chart01();
    chart03();
    
  } catch (error) {
    console.error('Error inicializando dashboard:', error);
    renderRecentTransactions([]);
  }
}

async function initializeTransactionsPage() {
  try {
    const transactions = await transactionService.loadTransactions();
    if (transactions.length > 0) {
      window.transactions = transactions.map(t => transactionService.formatTransactionForUI(t));
      renderTransactionTable(window.transactions, 1, 5);
    }
    
    if (typeof transactionsComponent === 'function') {
      transactionsComponent();
    }
    
  } catch (error) {
    console.error('Error inicializando página de transacciones:', error);
  }
}

async function initializeReportPage() {
  try {

  } catch (error) {
    console.error('Error inicializando página de reportes:', error);
  }
}

const dropzoneArea = document.querySelectorAll("#demo-upload");
if (dropzoneArea.length) {
  let myDropzone = new Dropzone("#demo-upload", { url: "/file/post" });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

window.transactionService = transactionService;
window.categoryService = categoryService;
window.reportService = reportService;

window.reportComponent = reportComponent;
window.transactionsComponent = transactionsComponent;
window.financialAdviceComponent = financialAdviceComponent;

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

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  const copyInput = document.getElementById("copy-input");
  if (copyInput) {
    const copyButton = document.getElementById("copy-button");
    const copyText = document.getElementById("copy-text");
    const websiteInput = document.getElementById("website-input");

    copyButton.addEventListener("click", () => {

      navigator.clipboard.writeText(websiteInput.value).then(() => {

        copyText.textContent = "Copied";

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

  if (!searchInput || !searchButton) return; 

  function focusSearchInput() {
    searchInput.focus();
  }

  searchButton.addEventListener("click", focusSearchInput);

  document.addEventListener("keydown", function (event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault(); 
      focusSearchInput();
    }
  });


  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault(); 
      focusSearchInput();
    }
  });
});
