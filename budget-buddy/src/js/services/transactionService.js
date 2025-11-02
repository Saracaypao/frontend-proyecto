import { API_CONFIG, apiRequest } from '../config/api.js';
import categoryService from './categoryService.js';

class TransactionService {
  constructor() {
    this.transactions = [];
    this.loaded = false;
  }

  async loadTransactions() {
    try {
      this.transactions = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.LIST);
      this.loaded = true;
      return this.transactions;
    } catch (error) {
      console.error('Error cargando transacciones:', error);
      return [];
    }
  }

  async getFilteredTransactions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
      if (filters.date) queryParams.append('date', filters.date);
      if (filters.type) queryParams.append('type', filters.type);
      
      const url = `${API_CONFIG.ENDPOINTS.TRANSACTIONS.FILTER}?${queryParams.toString()}`;
      return await apiRequest(url);
    } catch (error) {
      console.error('Error filtrando transacciones:', error);
      return [];
    }
  }

  async getLatestTransactions() {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.LATEST);
    } catch (error) {
      console.error('Error obteniendo últimas transacciones:', error);
      return [];
    }
  }

  async createTransaction(transactionData) {
    try {
      const newTransaction = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.CREATE, {
        method: 'POST',
        body: JSON.stringify(transactionData)
      });
      
      this.transactions.unshift(newTransaction);
      return newTransaction;
    } catch (error) {
      console.error('Error creando transacción:', error);
      throw error;
    }
  }

  async updateTransaction(id, transactionData) {
    try {
      await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.UPDATE(id), {
        method: 'PUT',
        body: JSON.stringify(transactionData)
      });
      
      const index = this.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        this.transactions[index] = { ...this.transactions[index], ...transactionData };
      }
      
      return true;
    } catch (error) {
      console.error('Error actualizando transacción:', error);
      throw error;
    }
  }

  async deleteTransaction(id) {
    try {
      await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.DELETE(id), {
        method: 'DELETE'
      });
      
      this.transactions = this.transactions.filter(t => t.id !== id);
      return true;
    } catch (error) {
      console.error('Error eliminando transacción:', error);
      throw error;
    }
  }

  async getTransactionById(id) {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.GET_BY_ID(id));
    } catch (error) {
      console.error('Error obteniendo transacción:', error);
      return null;
    }
  }

  async getCurrentMonthSummary() {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_CURRENT_MONTH);
    } catch (error) {
      console.error('Error obteniendo resumen del mes:', error);
      return { totalIncome: 0, totalExpense: 0 };
    }
  }

  async getLast6MonthsSummary() {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_LAST_6_MONTHS);
    } catch (error) {
      console.error('Error obteniendo resumen de 6 meses:', error);
      return [];
    }
  }

  formatTransactionForUI(transaction) {
    const visibility = transaction.isPublic ? "Public" : "Private";
    
    return {
      id: transaction.id,
      title: transaction.description,
      description: transaction.description,
      category: transaction.categoryName || 'Sin categoría',
      categoryId: transaction.categoryId || null,
      type: transaction.type, // INCOME | EXPENSE
      date: transaction.date,
      visibility: visibility,
      amount: `$${transaction.amount.toFixed(2)}`,
      rawAmount: transaction.amount,
      isPublic: transaction.isPublic
    };
  }

  formatTransactionForAPI(transaction) {
    return {
      description: transaction.description,
      categoryId: transaction.categoryId,
      date: transaction.date,
      amount: parseFloat(transaction.amount),
      type: transaction.type, // INCOME | EXPENSE
      isPublic: transaction.isPublic === 'true' || transaction.isPublic === true
    };
  }

  getBasicStats() {
    const income = this.transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = this.transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
      totalTransactions: this.transactions.length
    };
  }

  clearCache() {
    this.transactions = [];
    this.loaded = false;
  }
}

const transactionService = new TransactionService();
export default transactionService; 