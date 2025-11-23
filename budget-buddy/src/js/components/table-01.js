let sortState = {
  field: 'date',
  direction: 'asc'
};

let allTransactions = [];
let currentPageSize = 5;

// ========== LOCALSTORAGE SERVICE ==========
const StorageService = {
  SORT_PREFERENCE_KEY: 'transactionSortPreference',
  TRANSACTIONS_KEY: 'transactionsData',
  
  saveSortPreference(field, direction) {
    const preference = {
      field,
      direction,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(this.SORT_PREFERENCE_KEY, JSON.stringify(preference));
  },

  getSortPreference() {
    const preference = localStorage.getItem(this.SORT_PREFERENCE_KEY);
    return preference ? JSON.parse(preference) : null;
  },

  resetSortPreference() {
    localStorage.removeItem(this.SORT_PREFERENCE_KEY);
  },

  hasSortPreference() {
    return localStorage.getItem(this.SORT_PREFERENCE_KEY) !== null;
  },

  // Funciones para manejar las transacciones en localStorage
  saveTransactions(transactions) {
    localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(transactions));
  },

  getTransactions() {
    const transactions = localStorage.getItem(this.TRANSACTIONS_KEY);
    return transactions ? JSON.parse(transactions) : [];
  },

  deleteTransaction(transactionId) {
    const transactions = this.getTransactions();
    const filteredTransactions = transactions.filter(tx => tx.id !== transactionId);
    this.saveTransactions(filteredTransactions);
    return filteredTransactions;
  },

  updateTransaction(updatedTransaction) {
    const transactions = this.getTransactions();
    const updatedTransactions = transactions.map(tx => 
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    );
    this.saveTransactions(updatedTransactions);
    return updatedTransactions;
  }
};

// ========== FUNCIONES DE MANEJO DE TRANSACCIONES ==========
function handleDeleteTransaction(transactionToDelete) {
  console.log('Eliminando transacción:', transactionToDelete);
  
  try {
    // 1. Eliminar del localStorage
    const updatedTransactions = StorageService.deleteTransaction(transactionToDelete.id);
    
    // 2. Actualizar allTransactions
    allTransactions = updatedTransactions;
    
    // 3. Re-renderizar la tabla
    const currentPage = window.currentTransactionPage || 1;
    const sortedData = sortTransactions(allTransactions, sortState.field, sortState.direction);
    window.renderTransactionTable(sortedData, currentPage, currentPageSize);
    
    // 4. Actualizar transacciones recientes
    renderRecentTransactions(allTransactions);
    
    // 5. Mostrar notificación de éxito
    showNotification('Transacción eliminada correctamente', 'success');
    
  } catch (error) {
    console.error('Error al eliminar transacción:', error);
    showNotification('Error al eliminar la transacción', 'error');
  }
}

function handleEditTransaction(transactionToEdit) {
  console.log('Editando transacción:', transactionToEdit);
  
  // Aquí puedes implementar un modal de edición o un formulario
  // Por ahora, mostraremos un prompt simple para demostración
  const newDescription = prompt('Editar descripción:', transactionToEdit.description);
  
  if (newDescription !== null && newDescription.trim() !== '') {
    try {
      // 1. Actualizar la transacción
      const updatedTransaction = {
        ...transactionToEdit,
        description: newDescription.trim()
      };
      
      // 2. Guardar en localStorage
      const updatedTransactions = StorageService.updateTransaction(updatedTransaction);
      
      // 3. Actualizar allTransactions
      allTransactions = updatedTransactions;
      
      // 4. Re-renderizar la tabla
      const currentPage = window.currentTransactionPage || 1;
      const sortedData = sortTransactions(allTransactions, sortState.field, sortState.direction);
      window.renderTransactionTable(sortedData, currentPage, currentPageSize);
      
      // 5. Mostrar notificación
      showNotification('Transacción actualizada correctamente', 'success');
      
    } catch (error) {
      console.error('Error al editar transacción:', error);
      showNotification('Error al editar la transacción', 'error');
    }
  }
}

function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === 'success' 
      ? 'bg-green-500 text-white' 
      : type === 'error' 
      ? 'bg-red-500 text-white' 
      : 'bg-blue-500 text-white'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${message}</span>
      <button class="close-notification text-lg font-bold">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remover después de 3 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      setTimeout(() => notification.parentNode.removeChild(notification), 300);
    }
  }, 3000);
  
  // Botón para cerrar manualmente
  notification.querySelector('.close-notification').addEventListener('click', () => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });
}

// ========== FUNCIONES DE RENDERIZADO ==========
function generateTransactionRow(tx, index) {
  const typeClass =
    tx.visibility === "Private"
      ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
      : "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500";

  // Crear el elemento tr
  const tr = document.createElement('tr');
  tr.className = 'relative group';
  tr.setAttribute('data-id', tx.id);

  // Crear la celda de descripción con innerHTML
  const descriptionTd = document.createElement('td');
  descriptionTd.className = 'py-3';
  
  let descriptionContent = tx.description || '';
  if (tx.shouldHighlight && tx.searchTerm && tx.description) {
    const escapedTerm = escapeRegex(tx.searchTerm);
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    descriptionContent = tx.description.replace(regex, '<span class="highlight">$1</span>');
  }
  
  descriptionTd.innerHTML = `
    <div>
      <span class="text-gray-500 text-theme-xs dark:text-gray-400">
        ${descriptionContent}
      </span>
    </div>
  `;

  // Crear las otras celdas normalmente
  const categoryTd = document.createElement('td');
  categoryTd.className = 'py-3';
  categoryTd.innerHTML = `<p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.category}</p>`;

  const typeTd = document.createElement('td');
  typeTd.className = 'py-3';
  typeTd.innerHTML = `<p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.type}</p>`;

  const dateTd = document.createElement('td');
  dateTd.className = 'py-3';
  dateTd.innerHTML = `<p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.date}</p>`;

  const visibilityTd = document.createElement('td');
  visibilityTd.className = 'py-3';
  visibilityTd.innerHTML = `
    <p class="inline-flex items-center rounded-full px-2 py-0.5 text-theme-xs font-medium ${typeClass}">
      ${tx.visibility}
    </p>
  `;

  const actionsTd = document.createElement('td');
  actionsTd.className = 'py-3 flex items-center justify-between gap-2';
  actionsTd.innerHTML = `
    <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.amount}</p>
    <div class="relative">
      <button class="dropdown-toggle text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        ⋮
      </button>
      <div class="dropdown-menu absolute right-0 z-10 mt-2 hidden w-32 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
        <button class="edit-btn block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          Edit
        </button>
        <button class="delete-btn block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          Delete
        </button>
      </div>
    </div>
  `;

  // Agregar todas las celdas al tr
  tr.appendChild(descriptionTd);
  tr.appendChild(categoryTd);
  tr.appendChild(typeTd);
  tr.appendChild(dateTd);
  tr.appendChild(visibilityTd);
  tr.appendChild(actionsTd);

  return tr;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// rendering table with transactions data
export function renderTransactionTable(data = [], page = 1, pageSize = 5, onEdit = null, onDelete = null) {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-gray-500 dark:text-gray-400">No hay transacciones</td></tr>`;
    const container = document.getElementById("pagination");
    if (container) container.innerHTML = "";
    return;
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = data.slice(start, end);

  // Limpiar tbody
  tbody.innerHTML = '';

  // Agregar filas usando elementos DOM
  paginated.forEach((tx, i) => {
    const row = generateTransactionRow(tx, i);
    tbody.appendChild(row);
  });

  // El resto del código (dropdowns, eventos) permanece igual
  tbody.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = e.target.closest(".dropdown-toggle").nextElementSibling;
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== dropdown) menu.classList.add("hidden");
      });
      dropdown.classList.toggle("hidden");
    });
  });

  tbody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const row = e.target.closest("tr");
      const id = row.dataset.id;
      const transaction = data.find(tx => tx.id === id);
      if (onEdit && transaction) {
        onEdit(transaction);
      }
    });
  });

  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const row = e.target.closest("tr");
      const id = row.dataset.id;
      const transaction = data.find(tx => tx.id === id);
      
      const isConfirmed = await showConfirmationDialog();
      if (isConfirmed && onDelete && transaction) {
        onDelete(transaction);
      }
    });
  });

  window.currentTransactionPage = page;
  renderPagination(data, data.length, page, pageSize);
}

function showConfirmationDialog() {
  return new Promise((resolve) => {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete this transaction?</p>
        <div class="flex justify-end gap-3">
          <button class="cancel-btn px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button class="confirm-btn px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    `;

    const confirmBtn = dialog.querySelector('.confirm-btn');
    const cancelBtn = dialog.querySelector('.cancel-btn');

    const cleanup = () => {
      document.body.removeChild(dialog);
    };

    confirmBtn.addEventListener('click', () => {
      cleanup();
      resolve(true);
    });

    cancelBtn.addEventListener('click', () => {
      cleanup();
      resolve(false);
    });

    // Cerrar al hacer clic fuera del diálogo
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        cleanup();
        resolve(false);
      }
    });

    document.body.appendChild(dialog);
  });
}

function renderPagination(data, totalItems, currentPage, pageSize) {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <button ${currentPage === 1 ? "disabled" : ""} data-page="${currentPage - 1}"
      class="px-4 py-2 rounded-lg border border-gray-200 border-y dark:border-gray-700 text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 shadow-theme-xs ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5'}">
      ← Previous
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    html += `
      <button data-page="${i}"
        class="px-3 py-2 rounded-lg text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium
          ${isActive
        ? 'text-white shadow-theme-xs dark:text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'}"
        style="${isActive ? 'background-color: #465fff;' : ''}">
        ${i}
      </button>
    `;
  }

  html += `
    <button ${currentPage === totalPages ? "disabled" : ""} data-page="${currentPage + 1}"
      class="px-4 py-2 rounded-lg border border-gray-200 border-y dark:border-gray-700 text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 shadow-theme-xs ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5'}">
      Next →
    </button>
  `;

  container.innerHTML = html;

  container.querySelectorAll("button[data-page]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = Number(e.target.dataset.page);
      const sortedData = sortTransactions(allTransactions, sortState.field, sortState.direction);
      window.renderTransactionTable(sortedData, page, pageSize);
    });
  });
}

export function renderRecentTransactions(transactions = []) {
  const tbody = document.getElementById("recent-transactions-tbody");
  if (!tbody) return;

  if (transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-8 text-center text-gray-500 dark:text-gray-400">
          No recent transactions
        </td>
      </tr>
    `;
    return;
  }

  const recentTransactions = transactions.slice(0, 5);

  tbody.innerHTML = recentTransactions.map((tx, i) => `
    <tr class="relative group">
      <td class="py-3">
        <div>
          <span class="text-gray-500 text-theme-xs dark:text-gray-400">
            ${tx.description}
          </span>
        </div>
      </td>
      <td class="py-3">
        <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.category}</p>
      </td>
      <td class="py-3">
        <span class="inline-flex items-center rounded-full px-2 py-0.5 text-theme-xs font-medium ${tx.type === 'INCOME'
      ? 'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500'
      : 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500'
    }">
          ${tx.type === 'INCOME' ? 'Income' : 'Expense'}
        </span>
      </td>
      <td class="py-3">
        <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.date}</p>
      </td>
      <td class="py-3">
        <p class="text-gray-500 text-theme-sm dark:text-gray-400 font-medium ${tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
    }">${tx.amount}</p>
      </td>
    </tr>
  `).join('');
}

// ========== SORTING FUNCTIONS ==========
function sortTransactions(transactions, field, direction) {
  const sorted = [...transactions].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    if (field === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (field === 'amount') {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, '')) || 0;
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, '')) || 0;
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

function applySorting() {
  if (allTransactions.length === 0) return;
  
  const sortedData = sortTransactions(allTransactions, sortState.field, sortState.direction);
  const currentPage = window.currentTransactionPage || 1;
  window.renderTransactionTable(sortedData, currentPage, currentPageSize);
}

function initializeSortingControls() {
  const sortFieldSelect = document.getElementById('sort-field');
  const sortDirectionBtn = document.getElementById('sort-direction');
  const resetSortBtn = document.getElementById('reset-sort');
  
  if (!sortFieldSelect || !sortDirectionBtn) return;

  // Cargar preferencias guardadas
  const savedPreference = StorageService.getSortPreference();
  if (savedPreference) {
    sortState.field = savedPreference.field;
    sortState.direction = savedPreference.direction;
  }
  
  sortFieldSelect.value = sortState.field;
  updateSortDirectionButton();
  
  sortFieldSelect.addEventListener('change', (e) => {
    sortState.field = e.target.value;
    StorageService.saveSortPreference(sortState.field, sortState.direction);
    applySorting();
  });
  
  sortDirectionBtn.addEventListener('click', () => {
    sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    updateSortDirectionButton();
    StorageService.saveSortPreference(sortState.field, sortState.direction);
    applySorting();
  });

  if (resetSortBtn) {
    resetSortBtn.addEventListener('click', () => {
      sortState.field = 'date';
      sortState.direction = 'asc';
      
      sortFieldSelect.value = sortState.field;
      updateSortDirectionButton();
      
      StorageService.resetSortPreference();
      applySorting();
    });
  }
}

function updateSortDirectionButton() {
  const sortDirectionBtn = document.getElementById('sort-direction');
  if (!sortDirectionBtn) return;
  
  if (sortState.direction === 'asc') {
    sortDirectionBtn.textContent = '↑ Ascendente';
    sortDirectionBtn.classList.remove('bg-gray-600', 'text-gray-300');
    sortDirectionBtn.classList.add('bg-blue-500', 'text-white');
  } else {
    sortDirectionBtn.textContent = '↓ Descendente';
    sortDirectionBtn.classList.remove('bg-blue-500', 'text-white');
    sortDirectionBtn.classList.add('bg-gray-600', 'text-gray-300');
  }
}

// ========== SETUP WRAPPER ==========
export function setupSortingWrapper() {
  const originalRender = window.renderTransactionTable;
  
  window.renderTransactionTable = function(data = [], page = 1, pageSize = 5, onEdit = null, onDelete = null) {
    
    allTransactions = [...data];
    currentPageSize = pageSize;

    const sortedData = sortTransactions(data, sortState.field, sortState.direction);
    
    // Usar los callbacks proporcionados O los defaults
    const editCallback = onEdit || handleEditTransaction;
    const deleteCallback = onDelete || handleDeleteTransaction;
    
    return originalRender(sortedData, page, pageSize, editCallback, deleteCallback);
  };
}

// ========== INICIALIZACIÓN ==========
export function initializeTransactions() {
  // Cargar transacciones del localStorage
  const transactions = StorageService.getTransactions();
  allTransactions = transactions;
  
  // Configurar sorting
  setupSortingWrapper();
  initializeSortingControls();
  
  // Renderizar tabla inicial
  if (transactions.length > 0) {
    window.renderTransactionTable(transactions, 1, currentPageSize);
  }
  
  // Renderizar transacciones recientes
  renderRecentTransactions(transactions);
  
  console.log('Sistema de transacciones inicializado con', transactions.length, 'transacciones');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initializeTransactions();
});

// Mantener la referencia global
window.renderTransactionTable = renderTransactionTable;