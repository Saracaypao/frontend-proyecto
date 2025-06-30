function generateTransactionRow(tx, index) {
  const typeClass =
    tx.visibility === "Private"
      ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
      : "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500";

  return `
    <tr class="relative group" data-id="${tx.id}">
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
        <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.type}</p>
      </td>
      <td class="py-3">
        <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.date}</p>
      </td>
      <td class="py-3">
        <p class="inline-flex items-center rounded-full px-2 py-0.5 text-theme-xs font-medium ${typeClass}">
          ${tx.visibility}
        </p>
      </td>
      <td class="py-3 flex items-center justify-between gap-2">
        <p class="text-gray-500 text-theme-sm dark:text-gray-400">${tx.amount}</p>

        <!-- dropdown menu-->
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
      </td>
    </tr>
  `;
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

  tbody.innerHTML = paginated.map((tx, i) => generateTransactionRow(tx, i)).join("");

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
      if (onEdit && transaction) onEdit(transaction);
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
    
    confirmBtn.addEventListener('click', () => {
      document.body.removeChild(dialog);
      resolve(true);
    });
    
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(dialog);
      resolve(false);
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
      renderTransactionTable(data, page, pageSize);
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
        <span class="inline-flex items-center rounded-full px-2 py-0.5 text-theme-xs font-medium ${
          tx.type === 'INCOME' 
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
        <p class="text-gray-500 text-theme-sm dark:text-gray-400 font-medium ${
          tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
        }">${tx.amount}</p>
      </td>
    </tr>
  `).join('');
}

window.renderTransactionTable = renderTransactionTable;