// dummy data for financial advice table
const financialData = [
  {
    tittle: "Macbook Pro 13”",
    description: "Bought a new laptop",
    category: "Laptop",
    classification: "Expense",
    date: "2024/03/31",
    type: "Private",
    amount: "$2399.00",
  },
  {
    tittle: "Spotify Subscription",
    description: "Monthly music plan",
    category: "Entertainment",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$9.99",
  },
  {
    tittle: "Apple Watch Ultra",
    description: "Bought a new smartwatch",
    category: "Watch",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$879.00",
  },
  {
    tittle: "iPhone 15 Pro Max",
    description: "Bought mom a new phone",
    category: "Phone",
    classification: "Expense",
    date: "2024/04/01",
    type: "Private",
    amount: "$1869.00",
  },
    {
    tittle: "AirPods Pro 2nd Gen",
    description: "Bought new wireless earbuds",
    category: "Earbuds",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$240.00",
  },
    {
    tittle: "Macbook Pro 11”",
    description: "Bought a new laptop",
    category: "Laptop",
    classification: "Expense",
    date: "2024/05/31",
    type: "Private",
    amount: "$2399.00",
  },
  {
    tittle: "Spotify",
    description: "Monthly music plan",
    category: "Entertainment",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$9.99",
  },
  {
    tittle: "Apple Watch",
    description: "Bought a new smartwatch",
    category: "Watch",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$879.00",
  },
  {
    tittle: "iPhone 13 Pro Max",
    description: "Bought mom a new phone",
    category: "Phone",
    classification: "Expense",
    date: "2024/04/01",
    type: "Private",
    amount: "$1869.00",
  },
    {
    tittle: "AirPods Pro 3nd Gen",
    description: "Bought new wireless earbuds",
    category: "Earbuds",
    classification: "Expense",
    date: "2024/04/01",
    type: "Public",
    amount: "$240.00",
  }
];

// function to export financial data for use in other components
export let financialFilteredData = [...financialData];
const pageSize = 5;

// function to update the transaction card with details
export function renderFinancialTable(data = financialFilteredData, page = 1) {
  const tbody = document.querySelector("#financial-table-body");
  if (!tbody) return;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = data.slice(start, end);

  tbody.innerHTML = paginated.map((tx, index) => `
    <tr class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" data-index="${index}">
      <td class="py-3 text-gray-800 text-sm dark:text-white">${tx.tittle}</td>
      <td class="py-3 text-gray-500 text-sm dark:text-gray-400">${tx.date}</td>
    </tr>
  `).join("");

  tbody.querySelectorAll("tr").forEach((row, idx) => {
    row.addEventListener("click", () => {
      updateTransactionCard(paginated[idx]);
    });
  });

  if (paginated.length > 0) {
    updateTransactionCard(paginated[0]);
  }

  renderFinancialPagination(data.length, page);
}

// function to render pagination controls
function renderFinancialPagination(totalItems, currentPage) {
  const container = document.getElementById("financial-pagination");
  if (!container) return;

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="flex items-center gap-4">
      <button
        ${currentPage === 1 ? "disabled" : ""}
        class="px-3 py-1 rounded-lg border border-gray-200 border-y dark:border-gray-700 text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 shadow-theme-xs 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5'"
        data-page="${currentPage - 1}"
      >
        ←
      </button>

      <span class="text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
        Page ${currentPage} of ${totalPages}
      </span>

      <button
        ${currentPage === totalPages ? "disabled" : ""}
        class="px-3 py-1 rounded-lg border border-gray-200 border-y dark:border-gray-700 text-theme-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 shadow-theme-xs 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5'"
        data-page="${currentPage + 1}"
      >
       →
      </button>
    </div>
  `;

  container.querySelectorAll("button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = Number(btn.dataset.page);
      renderFinancialTable(financialFilteredData, page);
    });
  });
}

// function to apply filters to the financial data
export function applyFinancialFilters(filters) {
  financialFilteredData = financialData.filter(tx =>
    (!filters.category || tx.category.toLowerCase().includes(filters.category.toLowerCase())) &&
    (!filters.date || tx.date === filters.date) &&
    (!filters.type || tx.type === filters.type)
  );

  renderFinancialTable(financialFilteredData, 1);
}

// function to reset financial filters to show all data
export function resetFinancialFilters() {
  financialFilteredData = [...financialData];
  renderFinancialTable(financialFilteredData, 1);
}

// this module exports the functions to be used in other components
window.resetFinancialFilters = resetFinancialFilters;
window.renderFinancialTable = renderFinancialTable;
window.applyFinancialFilters = applyFinancialFilters;

