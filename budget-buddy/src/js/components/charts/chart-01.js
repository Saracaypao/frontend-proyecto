// src/js/components/charts/chart-01.js
import ApexCharts from "apexcharts";
import { API_CONFIG, apiRequest } from "../../config/api.js";

export default function chart01() {
  const chart01Options = {
    series: [
      {
        name: "Ingresos",
        data: [0, 0, 0, 0, 0, 0],
        color: "#10B981" // Verde para ingresos
      },
      {
        name: "Gastos",
        data: [0, 0, 0, 0, 0, 0],
        color: "#EF4444" // Rojo para gastos
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    yaxis: {
      title: {
        text: "$ (dólares)",
        style: {
          color: "#6B7280",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        formatter: function (val) {
          return "$" + val.toFixed(0);
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val.toFixed(2) + " dólares";
        },
      },
      theme: "dark",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#6B7280",
        useSeriesColors: false,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
  };

  // Cargar datos del backend
  async function loadChartData() {
    try {
      const data = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_LAST_6_MONTHS);
      
      // Actualizar los datos del gráfico
      if (data && data.length > 0) {
        const incomeData = data.map(item => item.income || 0);
        const expenseData = data.map(item => item.expense || 0);
        
        // Actualizar las series del gráfico
        chart01Options.series[0].data = incomeData;
        chart01Options.series[1].data = expenseData;
        
        // Re-renderizar el gráfico si ya existe
        if (window.chart01) {
          window.chart01.updateOptions({
            series: chart01Options.series
          });
        }
      }
    } catch (error) {
      console.error("Error cargando datos del gráfico:", error);
      // Mantener datos por defecto en caso de error
    }
  }

  const chartSelector = document.querySelectorAll("#chartOne");
  if (chartSelector.length) {
    const chart01 = new ApexCharts(document.querySelector("#chartOne"), chart01Options);
    chart01.render();
    window.chart01 = chart01;
    
    // Cargar datos después de renderizar
    setTimeout(() => {
      loadChartData();
    }, 500);
  }
}