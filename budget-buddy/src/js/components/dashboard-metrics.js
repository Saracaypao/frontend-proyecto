// src/js/components/dashboard-metrics.js
export async function loadCurrentMonthMetrics() {
  const jwt = localStorage.getItem("jwtToken");
  if (!jwt) return console.warn("No JWT token found");

  try {
    const res = await fetch("http://localhost:8080/transactions/summary/current-month", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { income, expense } = await res.json();

    // reset with separator of thousands and 2 decimals
    const fmt = val => Number(val).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    document
      .querySelector("#card-income .metric-value")
      .textContent = `$${fmt(income)}`;
    document
      .querySelector("#card-expenses .metric-value")
      .textContent = `$${fmt(expense)}`;

  } catch (err) {
    console.error("Error cargando métricas del mes actual:", err);
  }
}