// src/js/components/charts/chart-01.js
import ApexCharts from "apexcharts";

export default async function chart01() {
  const jwt = localStorage.getItem("jwtToken");
  let data;

  try {
    const res = await fetch("http://localhost:8080/transactions/summary/last-6-months", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json(); // [{ month: "JANUARY", income: 123, expense: 45 }, ...]
  } catch (err) {
    console.error("Error cargando datos de 6 meses:", err);
    // fallback data in case of error
    data = [
      { month: "Jan", income: 800, expense: 300 },
      { month: "Feb", income: 950, expense: 400 },
      { month: "Mar", income: 900, expense: 350 },
      { month: "Apr", income: 1000, expense: 500 },
      { month: "May", income: 1050, expense: 490 },
      { month: "Jun", income: 1100, expense: 600 },
    ];
  }

  const categories   = data.map(d => d.month.substring(0,3));
  const incomeSeries = data.map(d => d.income);
  const expenseSeries= data.map(d => d.expense);

  const options = {
    chart: {
      type: "bar",
      height: 260,
      toolbar: { show: false },
    },
    series: [
      { name: "Income",  data: incomeSeries  },
      { name: "Expenses",data: expenseSeries },
    ],
    colors: ["#465fff", "#6495ED"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "75%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks:  { show: false },
    },
    yaxis: { labels: { style: { colors: "#6b7280" } } },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: { colors: "#6b7280" },
      markers: { radius: 99 },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: val => $`${val} `}
    },
  };

  const chartEl = document.querySelector("#chartOne");
  if (chartEl) {
    new ApexCharts(chartEl, options).render();
  }
}