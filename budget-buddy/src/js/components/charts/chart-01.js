
import ApexCharts from "apexcharts";
import { API_CONFIG, apiRequest } from "../../config/api.js";

export default function chart01() {
  const chart01Options = {
    series: [
      {
        name: "Income",
        data: [0, 0, 0, 0, 0, 0],
        color: "#6495ED" 
      },
      {
        name: "Expenses",
        data: [0, 0, 0, 0, 0, 0],
        color: "#465fff" 
      },
    ],
    chart: {
      type: "bar",
      height: 260,
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "75%",
        borderRadiusApplication: "end",
        borderRadius: 5,
      },
        dataLabels: {
          position: "top",
        },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: [], // loading from backend
      labels: {
        style: {
          colors: "#465fff",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: { show: false },
      axisTicks:  { show: false },
    },
    yaxis: {
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
          return "$ " + val.toFixed(2) + " dollars";
        },
      },
      theme: "dark",
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: { colors: "#6b7280" },
      markers: { radius: 99 },
    },
  };

  async function loadChartData() {
    try {
      const data = await apiRequest(API_CONFIG.ENDPOINTS.TRANSACTIONS.SUMMARY_LAST_6_MONTHS);

      console.log("Backend data:", data);

      if (data && data.length > 0) {
        const incomeData = data.map(item => item.income || 0);
        const expenseData = data.map(item => item.expense || 0);

        // short forms of the months
        const monthMap = {
          JANUARY: "Jan", FEBRUARY: "Feb", MARCH: "Mar",
          APRIL: "Apr", MAY: "May", JUNE: "Jun",
          JULY: "Jul", AUGUST: "Aug", SEPTEMBER: "Sept",
          OCTOBER: "Oct", NOVEMBER: "Nov", DECEMBER: "Dec",
        };

        const categories = data.map(item => monthMap[item.month?.toUpperCase()] || item.month);

        chart01Options.series[0].data = incomeData;
        chart01Options.series[1].data = expenseData;
        chart01Options.xaxis.categories = categories;

        if (window.chart01) {
          window.chart01.updateOptions({
            series: chart01Options.series,
            xaxis: {
              categories: categories
            }
          });
        }
      }
    } catch (error) {
      console.error("Error loading chart data:", error);
    }
  }

  const chartSelector = document.querySelectorAll("#chartOne");
  if (chartSelector.length) {
    const chart01 = new ApexCharts(document.querySelector("#chartOne"), chart01Options);
    chart01.render();
    window.chart01 = chart01;

    setTimeout(() => {
      loadChartData();
    }, 500);
  }
}