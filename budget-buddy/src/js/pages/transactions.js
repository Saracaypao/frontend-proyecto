import { renderTransactionTable } from "../components/table-01.js";

export default function transactionsComponent() {
  return {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
    isTransactionModal: false,
    newTransaction: {
      description: "",
      categoryId: "",
      date: "",
      classification: "",  
      type: "",            
      amount: null,
    },
    filters: { category: "", date: "", type: "" },

    async fetchTransactions() {
      const jwt = localStorage.getItem("jwtToken");
      try {
        const res = await fetch("http://localhost:8080/transactions", {
          headers: { "Authorization": `Bearer ${jwt}` }
        });
        if (!res.ok) throw new Error(res.statusText);
        const serverData = await res.json();
        // Mapeo al formato que espera renderTransactionTable
        window.transactions = serverData.map(tx => ({
          tittle: tx.description,
          description: tx.description,
          category: tx.category.name,
          classification: tx.type,                // INCOME | EXPENSE
          date: tx.date,                          // yyyy-MM-dd
          type: tx.isPublic ? "Public" : "Private",
          amount: `$${tx.amount.toFixed(2)}`,
          id: tx.id
        }));
        renderTransactionTable(window.transactions);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
      }
    },

    async createTransaction() {
      const jwt = localStorage.getItem("jwtToken");
      try {
        const body = {
          description: this.newTransaction.description,
          categoryId: this.newTransaction.categoryId,
          date: this.newTransaction.date,
          amount: this.newTransaction.amount,
          type: this.newTransaction.classification,
          isPublic: this.newTransaction.type === "Public"
        };
        const res = await fetch("http://localhost:8080/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(res.statusText);
        // limpia el formulario y cierra el modal
        this.newTransaction = { description: "", categoryId: "", date: "", classification: "", type: "", amount: null };
        this.isTransactionModal = false;
        // recarga la tabla
        this.fetchTransactions();
      } catch (err) {
        console.error("Error creando transacción:", err);
      }
    },

    applyFilters() {
      const f = this.filters;
      const filtered = window.transactions.filter(tx =>
        (!f.category || tx.category.toLowerCase().includes(f.category.toLowerCase())) &&
        (!f.date     || tx.date === f.date) &&
        (!f.type     || tx.type === f.type)
      );
      renderTransactionTable(filtered);
      this.filters = { category: "", date: "", type: "" };
    }
  };
}