import ApexCharts from "apexcharts";
import { API_CONFIG, apiRequest } from "../config/api.js";

let chartInstance = null;

function buildChartOptions(categories = [], data = []) {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  return {
    series: [{ 
      name: "Monto", 
      data: data, 
      color: isDarkMode ? "#3B82F6" : "#465fff" 
    }],
    chart: { 
      type: "bar", 
      height: 320, 
      toolbar: { show: false },
      background: 'transparent',
      foreColor: isDarkMode ? '#E5E7EB' : '#6B7280'
    },
    plotOptions: { 
      bar: { 
        horizontal: false, 
        columnWidth: "60%", 
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      } 
    },
    xaxis: { 
      categories, 
      labels: { 
        style: { 
          colors: isDarkMode ? '#E5E7EB' : '#6B7280',
          fontSize: '13px',
          fontWeight: 500
        } 
      },
      axisBorder: {
        show: true,
        color: isDarkMode ? '#374151' : '#E5E7EB'
      },
      axisTicks: {
        show: true,
        color: isDarkMode ? '#374151' : '#E5E7EB'
      }
    },
    yaxis: { 
      labels: { 
        style: {
          colors: isDarkMode ? '#E5E7EB' : '#6B7280',
          fontSize: '13px',
          fontWeight: 500
        },
        formatter: (v) => "$" + (v ?? 0).toFixed(0) 
      }
    },
    dataLabels: { enabled: false },
    tooltip: { 
      theme: isDarkMode ? 'dark' : 'light',
      y: { formatter: (v) => "$" + (v ?? 0).toFixed(2) },
      style: {
        fontSize: '13px'
      }
    },
    legend: { show: false },
    grid: {
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    theme: {
      mode: isDarkMode ? 'dark' : 'light'
    }
  };
}

async function loadAssignmentsAndFillClients() {
  try {
    const select = document.getElementById('clientSelect');
    if (!select) {
      console.log('Selector de clientes no encontrado, saltando carga');
      return;
    }
    
    console.log('Cargando clientes asignados...');
    console.log('Endpoint:', API_CONFIG.ENDPOINTS.ADVICE.GET_MY_ASSIGNED_CLIENTS);
    
    const clientsResponse = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_ASSIGNED_CLIENTS);
    console.log('Respuesta del servidor:', clientsResponse);
    
    if (!clientsResponse) {
      console.warn('No se recibió respuesta del servidor');
      return;
    }
    
    if (!Array.isArray(clientsResponse)) {
      console.warn('La respuesta no es un array:', typeof clientsResponse);
      return;
    }
    
    if (clientsResponse.length === 0) {
      console.warn('No hay clientes asignados');
      return;
    }

    // Usar Map para garantizar clientes únicos por userId
    const uniqueClientsMap = new Map();
    
    clientsResponse.forEach(c => {
      const userId = c.userId;
      const name = c.fullName && c.fullName.trim() ? c.fullName : (c.email || 'Usuario');
      
      // Solo agregar si no existe ya en el Map
      if (!uniqueClientsMap.has(userId)) {
        uniqueClientsMap.set(userId, name);
      }
    });
    
    console.log(`Clientes únicos: ${uniqueClientsMap.size} de ${clientsResponse.length} total`);

    // Limpiar opciones existentes (excepto la primera)
    while (select.options.length > 1) {
      select.remove(1);
    }

    // Agregar clientes únicos al selector
    uniqueClientsMap.forEach((name, userId) => {
      const opt = document.createElement('option');
      opt.value = userId;
      opt.textContent = name;
      select.appendChild(opt);
    });
    
    console.log(`Se agregaron ${uniqueClientsMap.size} clientes únicos al selector`);

  } catch (e) {
    console.error('Error cargando asignaciones:', e);
    console.error('Detalles del error:', e.message);
  }
}

async function fetchChartData() {
  const clientSelect = document.getElementById('clientSelect');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  
  if (!clientSelect || !startDateInput || !endDateInput) return;
  
  const userId = clientSelect.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

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
  if (!container) return;
  
  if (!chartInstance) {
    const options = buildChartOptions(categories, data);
    chartInstance = new ApexCharts(container, options);
    chartInstance.render();
  } else {
    const options = buildChartOptions(categories, data);
    chartInstance.updateOptions(options);
    chartInstance.updateSeries([{ name: 'Monto', data }]);
  }
}

async function clearFilters() {
  const clientSelect = document.getElementById('clientSelect');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  
  if (clientSelect) clientSelect.value = '';
  if (startDate) startDate.value = '';
  if (endDate) endDate.value = '';
  
  await loadDefaultChart();
}

function setupEvents() {
  const applyBtn = document.getElementById('applyBtn');
  const clearBtn = document.getElementById('clearBtn');
  const clientSelect = document.getElementById('clientSelect');
  
  if (!applyBtn || !clearBtn || !clientSelect) {
    console.warn('Elementos de gráficos no encontrados en esta página');
    return;
  }
  
  applyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchChartData();
  });
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearFilters();
  });
  clientSelect.addEventListener('change', fetchChartData);
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
  await initGraficosPage();
});

async function initGraficosPage() {
  // Verificar que estamos en la página correcta
  const chartContainer = document.getElementById('advisorBarChart');
  if (!chartContainer) {
    console.log('No estamos en la página de gráficos, saltando inicialización');
    return;
  }
  
  // Aplicar dark mode inicial al elemento html
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.classList.add('dark', 'bg-gray-900');
  } else {
    document.documentElement.classList.remove('dark', 'bg-gray-900');
  }
  
  // Observar cambios en localStorage para sincronizar dark mode
  const syncDarkMode = () => {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true';
    if (currentDarkMode) {
      document.documentElement.classList.add('dark', 'bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark', 'bg-gray-900');
    }
  };
  
  // Ejecutar cada 100ms para detectar cambios
  setInterval(syncDarkMode, 100);
  
  await loadAssignmentsAndFillClients();
  setupEvents();
  await loadDefaultChart();
  
  // Escuchar cambios en localStorage para actualizar el gráfico cuando cambie el tema
  window.addEventListener('storage', (e) => {
    if (e.key === 'darkMode' && chartInstance) {
      // Refrescar el gráfico con el nuevo tema
      const userId = document.getElementById('clientSelect')?.value;
      if (userId) {
        fetchChartData();
      } else {
        loadDefaultChart();
      }
    }
  });
  
  // Observar cambios en el atributo class del html para detectar cambios de tema en la misma pestaña
  let lastDarkMode = localStorage.getItem('darkMode') === 'true';
  const checkDarkModeChange = () => {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true';
    if (currentDarkMode !== lastDarkMode) {
      lastDarkMode = currentDarkMode;
      
      // Actualizar clases en html
      if (currentDarkMode) {
        document.documentElement.classList.add('dark', 'bg-gray-900');
      } else {
        document.documentElement.classList.remove('dark', 'bg-gray-900');
      }
      
      // Actualizar gráfico
      if (chartInstance) {
        const userId = document.getElementById('clientSelect')?.value;
        if (userId) {
          fetchChartData();
        } else {
          loadDefaultChart();
        }
      }
    }
  };
  
  // Verificar cambios cada 100ms
  setInterval(checkDarkModeChange, 100);
}

export { updateChart, loadDefaultChart, fetchChartData, initGraficosPage };
