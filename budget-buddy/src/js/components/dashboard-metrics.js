// src/js/components/dashboard-metrics.js
import { API_CONFIG, apiRequest } from "../config/api.js";

export async function loadCurrentMonthMetrics() {
  try {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_CURRENT_MONTH);
    
    // Actualizar las métricas en el DOM usando los IDs correctos del HTML
    const totalIncomeElement = document.querySelector("#card-income .metric-value");
    const totalExpenseElement = document.querySelector("#card-expenses .metric-value");
    const balanceElement = document.querySelector("#card-balance .metric-value");
    
    if (totalIncomeElement) {
      totalIncomeElement.textContent = `$${data.income?.toFixed(2) || '0.00'}`;
    }
    
    if (totalExpenseElement) {
      totalExpenseElement.textContent = `$${data.expense?.toFixed(2) || '0.00'}`;
    }
    
    // Calcular y mostrar el balance
    const balance = (data.income || 0) - (data.expense || 0);
    
    if (balanceElement) {
      balanceElement.textContent = `$${balance.toFixed(2)}`;
      // Cambiar color según si es positivo o negativo
      const balanceCard = document.getElementById("card-balance");
      if (balanceCard) {
        if (balance >= 0) {
          balanceCard.classList.add("text-green-600");
          balanceCard.classList.remove("text-red-600");
        } else {
          balanceCard.classList.add("text-red-600");
          balanceCard.classList.remove("text-green-600");
        }
      }
    }
    
  } catch (error) {
    console.error("Error cargando métricas del mes actual:", error);
    // Mostrar valores por defecto en caso de error
    const totalIncomeElement = document.querySelector("#card-income .metric-value");
    const totalExpenseElement = document.querySelector("#card-expenses .metric-value");
    const balanceElement = document.querySelector("#card-balance .metric-value");
    
    if (totalIncomeElement) totalIncomeElement.textContent = "$0.00";
    if (totalExpenseElement) totalExpenseElement.textContent = "$0.00";
    if (balanceElement) balanceElement.textContent = "$0.00";
  }
}