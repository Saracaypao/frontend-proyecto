// function that generates table rows for transactions
function generateTransactionRow(tx, index) {
  const typeClass =
    tx.visibility === "Private"
      ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
      : "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500";

  return `
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
          <button class="dropdown-toggle text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" data-index="${index}">
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

  // this will close any open dropdown menus when clicking outside of them
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      if (!menu.parentElement.contains(e.target)) menu.classList.add("hidden");
    });
  });

    // assign functionality to dropdown toggle buttons
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== dropdown) menu.classList.add("hidden");
      });
      dropdown.classList.toggle("hidden");
    });
  });

    // this will assign functionality to the Edit and Delete button
  document.querySelectorAll(".edit-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (onEdit && typeof onEdit === 'function') {
        onEdit(paginated[i]);
      } else {
        alert(`Edit clicked on row ${i + 1}`);
      }
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (onDelete && typeof onDelete === 'function') {
        onDelete(paginated[i]);
      } else {
        alert(`Delete clicked on row ${i + 1}`);
      }
    });
  });

  window.currentTransactionPage = page;
  renderPagination(data, data.length, page, pageSize);
}

// function to render pagination controls
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
      const page = Number(e.target.dataset.page);
      renderTransactionTable(data, page, pageSize);
    });
  });
}

// Función para renderizar transacciones recientes en el dashboard
export function renderRecentTransactions(transactions = []) {
  const tbody = document.getElementById("recent-transactions-tbody");
  if (!tbody) return;

  if (transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-8 text-center text-gray-500 dark:text-gray-400">
          No hay transacciones recientes
        </td>
      </tr>
    `;
    return;
  }

  // Limitar a las últimas 5 transacciones
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
