import { renderTransactionTable } from "../components/table-01.js";
import transactionService from "../services/transactionService.js";
import categoryService from "../services/categoryService.js";

export default function transactionsComponent() {
  return {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
    isTransactionModal: false,
    isCategoryModal: false,
    isEditMode: false,
    editingTransactionId: null,
    newTransaction: {
      description: "",
      categoryId: "",
      date: "",
      type: "EXPENSE",  
      isPublic: false,            
      amount: null,
    },
    newCategory: {
      name: ""
    },
    filters: { 
      category: "", 
      date: "", 
      type: "" 
    },
    categories: [],
    transactions: [],
    loading: false,

    async init() {
      await this.loadCategories();
      await this.fetchTransactions();
    },

    async loadCategories() {
      try {
        this.categories = await categoryService.loadCategories();
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    },

    async fetchTransactions() {
      this.loading = true;
      try {
        const serverData = await transactionService.loadTransactions();
        this.transactions = serverData.map(tx => transactionService.formatTransactionForUI(tx));
        renderTransactionTable(this.transactions, 1, 5);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
        this.showNotification("Error cargando transacciones", "error");
      } finally {
        this.loading = false;
      }
    },

    async createTransaction() {
      if (!this.validateTransaction()) return;

      try {
        this.newTransaction.isPublic = (this.newTransaction.isPublic === 'true' || this.newTransaction.isPublic === true);
        const transactionData = transactionService.formatTransactionForAPI(this.newTransaction);
        await transactionService.createTransaction(transactionData);
        
        this.showNotification("Transacción creada exitosamente", "success");
        this.resetForm();
        this.isTransactionModal = false;
        await this.fetchTransactions();
      } catch (err) {
        console.error("Error creando transacción:", err);
        this.showNotification("Error creando transacción", "error");
      }
    },

    async createCategory() {
      if (!this.validateCategory()) return;

      try {
        const newCategory = await categoryService.createCategory(this.newCategory);
        this.categories.push(newCategory);
        this.closeCategoryModal();
        this.showNotification("Categoría creada exitosamente", "success");
        await this.loadCategories();
      } catch (err) {
        console.error("Error creando categoría:", err);
        this.showNotification("Error creando categoría", "error");
      }
    },

    async updateTransaction() {
      if (!this.validateTransaction()) return;

      try {
        this.newTransaction.isPublic = (this.newTransaction.isPublic === 'true' || this.newTransaction.isPublic === true);
        const transactionData = transactionService.formatTransactionForAPI(this.newTransaction);
        await transactionService.updateTransaction(this.editingTransactionId, transactionData);
        
        this.showNotification("Transacción actualizada exitosamente", "success");
        this.resetForm();
        this.isTransactionModal = false;
        this.isEditMode = false;
        this.editingTransactionId = null;
        await this.fetchTransactions();
      } catch (err) {
        console.error("Error actualizando transacción:", err);
        this.showNotification("Error actualizando transacción", "error");
      }
    },

    async deleteTransaction(id) {
      if (!confirm("¿Estás seguro de que quieres eliminar esta transacción?")) return;

      try {
        await transactionService.deleteTransaction(id);
        this.showNotification("Transacción eliminada exitosamente", "success");
        await this.fetchTransactions();
      } catch (err) {
        console.error("Error eliminando transacción:", err);
        this.showNotification("Error eliminando transacción", "error");
      }
    },

    editTransaction(transaction) {
      this.isEditMode = true;
      this.editingTransactionId = transaction.id;
      this.newTransaction = {
        description: transaction.description,
        categoryId: transaction.categoryId,
        date: transaction.date,
        type: transaction.type,
        isPublic: transaction.isPublic,
        amount: transaction.rawAmount,
      };
      this.isTransactionModal = true;
    },

    async applyFilters() {
      this.loading = true;
      try {
        const filters = {};
        if (this.filters.category) filters.categoryId = this.filters.category;
        if (this.filters.date) filters.date = this.filters.date;
        if (this.filters.type) filters.type = this.filters.type;

        const filteredData = await transactionService.getFilteredTransactions(filters);
        this.transactions = filteredData.map(tx => transactionService.formatTransactionForUI(tx));
        renderTransactionTable(this.transactions, 1, 5);
      } catch (err) {
        console.error("Error aplicando filtros:", err);
        this.showNotification("Error aplicando filtros", "error");
      } finally {
        this.loading = false;
      }
    },

    clearFilters() {
      this.filters = { category: "", date: "", type: "" };
      this.fetchTransactions();
    },

    validateTransaction() {
      if (!this.newTransaction.description.trim()) {
        this.showNotification("La descripción es requerida", "error");
        return false;
      }
      if (!this.newTransaction.categoryId) {
        this.showNotification("La categoría es requerida", "error");
        return false;
      }
      if (!this.newTransaction.date) {
        this.showNotification("La fecha es requerida", "error");
        return false;
      }
      if (!this.newTransaction.amount || this.newTransaction.amount <= 0) {
        this.showNotification("El monto debe ser mayor a 0", "error");
        return false;
      }
      return true;
    },

    validateCategory() {
      if (!this.newCategory.name.trim()) {
        this.showNotification("El nombre de la categoría es requerido", "error");
        return false;
      }
      return true;
    },

    resetForm() {
      this.newTransaction = {
        description: "",
        categoryId: "",
        date: "",
        type: "EXPENSE",
        isPublic: false,
        amount: null,
      };
    },

    resetCategoryForm() {
      this.newCategory = {
        name: ""
      };
    },

    openNewTransactionModal() {
      this.isEditMode = false;
      this.editingTransactionId = null;
      this.resetForm();
      this.isTransactionModal = true;
    },

    openCategoryModal() {
      this.resetCategoryForm();
      this.isCategoryModal = true;
    },

    closeModal() {
      this.isTransactionModal = false;
      this.isEditMode = false;
      this.editingTransactionId = null;
      this.resetForm();
    },

    closeCategoryModal() {
      this.isCategoryModal = false;
      this.resetCategoryForm();
    },

    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
      }`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Sin categoría';
    },

    getCategoriesForSelect() {
      return this.categories.map(category => ({
        value: category.id,
        label: category.name
      }));
    }
  };
}