import { API_CONFIG, apiRequest } from "../config/api.js";

export async function loadCurrentMonthMetrics() {
  try {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_CURRENT_MONTH);
    
    const totalIncomeElement = document.querySelector("#card-income .metric-value");
    const totalExpenseElement = document.querySelector("#card-expenses .metric-value");
    const balanceElement = document.querySelector("#card-balance .metric-value");
    
    if (totalIncomeElement) {
      totalIncomeElement.textContent = `$${data.income?.toFixed(2) || '0.00'}`;
    }
    
    if (totalExpenseElement) {
      totalExpenseElement.textContent = `$${data.expense?.toFixed(2) || '0.00'}`;
    }
    
    const balance = (data.income || 0) - (data.expense || 0);
    
    if (balanceElement) {
      balanceElement.textContent = `$${balance.toFixed(2)}`;
      const balanceCard = document.getElementById("card-balance");
      if (balanceCard) {
        if (balance >= 0) {
          balanceCard.classList.add("text-green-500");
          balanceCard.classList.remove("text-red-500");
        } else {
          balanceCard.classList.add("text-red-500");
          balanceCard.classList.remove("text-green-500");
        }
      }
    }
    
  } catch (error) {
    console.error("Error cargando métricas del mes actual:", error);

    const totalIncomeElement = document.querySelector("#card-income .metric-value");
    const totalExpenseElement = document.querySelector("#card-expenses .metric-value");
    const balanceElement = document.querySelector("#card-balance .metric-value");
    
    if (totalIncomeElement) totalIncomeElement.textContent = "$0.00";
    if (totalExpenseElement) totalExpenseElement.textContent = "$0.00";
    if (balanceElement) balanceElement.textContent = "$0.00";
  }
}