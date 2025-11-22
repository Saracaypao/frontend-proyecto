import ApexCharts from "apexcharts";
import { API_CONFIG, apiRequest } from "../config/api.js";

let chartInstance = null;

function buildChartOptions(categories = [], data = []) {
  return {
    series: [{ name: "Monto", data: data, color: "#465fff" }],
    chart: { type: "bar", height: 320, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "60%", borderRadius: 4 } },
    xaxis: { categories, labels: { style: { colors: "#6B7280" } } },
    yaxis: { labels: { formatter: (v) => "$" + (v ?? 0).toFixed(0) } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v) => "$" + (v ?? 0).toFixed(2) } },
    legend: { show: false },
  };
}

async function loadAssignmentsAndFillClients() {
  try {
    // Nuevo endpoint dedicado que devuelve clientes únicos históricos con nombres
    const clientsResponse = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_ASSIGNED_CLIENTS);
    const select = document.getElementById('clientSelect');
    if (!clientsResponse || !Array.isArray(clientsResponse)) return;

    const clients = clientsResponse.map(c => ({
      id: c.userId,
      name: c.fullName && c.fullName.trim() ? c.fullName : (c.email || 'Usuario')
    }));

    // popular select
    clients.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    });

  } catch (e) {
    console.error('Error cargando asignaciones:', e);
  }
}

async function fetchChartData() {
  const userId = document.getElementById('clientSelect').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  if (!userId) {
    // si no hay cliente, cargar dataset por defecto con ceros
    await loadDefaultChart();
    return;
  }

  try {
    const endpoint = API_CONFIG.ENDPOINTS.TRANSACTIONS.PUBLIC_BY_CLIENT_CATEGORY(userId, startDate || null, endDate || null);
    const data = await apiRequest(endpoint);
    const categories = data.categories || Object.keys(data.distributionByCategory || {});
    const values = data.data || Object.values(data.distributionByCategory || {});
    updateChart(categories, values);
  } catch (e) {
    console.error('Error obteniendo datos del gráfico:', e);
  }
}

function updateChart(categories, data) {
  const container = document.getElementById('advisorBarChart');
  if (!chartInstance) {
    const options = buildChartOptions(categories, data);
    chartInstance = new ApexCharts(container, options);
    chartInstance.render();
  } else {
    chartInstance.updateOptions({ xaxis: { categories } });
    chartInstance.updateSeries([{ name: 'Monto', data }]);
  }
}

async function clearFilters() {
  document.getElementById('clientSelect').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  await loadDefaultChart();
}

function setupEvents() {
  document.getElementById('applyBtn').addEventListener('click', (e) => {
    e.preventDefault();
    fetchChartData();
  });
  document.getElementById('clearBtn').addEventListener('click', (e) => {
    e.preventDefault();
    clearFilters();
  });
  document.getElementById('clientSelect').addEventListener('change', fetchChartData);
}

async function loadDefaultChart() {
  try {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.DEFAULT_BY_CATEGORY);
    const categories = data?.categories || [];
    const values = data?.data || [];
    updateChart(categories, values);
  } catch (e) {
    console.error('Error cargando gráfico por defecto:', e);
    updateChart([], []);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAssignmentsAndFillClients();
  setupEvents();
  await loadDefaultChart();
});
