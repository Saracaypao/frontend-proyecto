import reportService from '../services/reportService.js';
import { renderReportChart } from '../components/charts/chart-02.js';

export default function reportComponent() {
  return {
    currentReport: null,
    loading: false,
    selectedPeriod: 'general',
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth() + 1,
    startDate: '',
    endDate: '',
    last6MonthsData: [],
    availableYears: [],
    availableMonths: [],

    async init() {
      this.availableYears = reportService.getAvailableYears();
      this.availableMonths = reportService.getAvailableMonths();
      await this.loadGeneralReport();
      await this.loadLast6MonthsData();
    },

    async loadGeneralReport() {
      this.loading = true;
      try {
        const report = await reportService.getGeneralReport();
        this.currentReport = reportService.formatReportForUI(report);
        this.renderReport();
      } catch (error) {
        console.error('Error loading general report:', error);
        this.showNotification('Error loading general report', 'error');
      } finally {
        this.loading = false;
      }
    },

    async loadReportByYear() {
      this.loading = true;
      try {
        const report = await reportService.getReportByYear(this.selectedYear);
        this.currentReport = reportService.formatReportForUI(report);
        this.renderReport();
      } catch (error) {
        console.error('Error loading yearly report:', error);
        this.showNotification('Error loading yearly report', 'error');
      } finally {
        this.loading = false;
      }
    },

    async loadReportByMonth() {
      this.loading = true;
      try {
        const report = await reportService.getReportByMonth(this.selectedYear, this.selectedMonth);
        this.currentReport = reportService.formatReportForUI(report);
        this.renderReport();
      } catch (error) {
        console.error('Error loading monthly report:', error);
        this.showNotification('Error loading monthly report', 'error');
      } finally {
        this.loading = false;
      }
    },

    async loadReportByDateRange() {
      if (!this.startDate || !this.endDate) {
        this.showNotification('Please select start and end dates', 'error');
        return;
      }

      this.loading = true;
      try {
        const report = await reportService.getReportByDateRange(this.startDate, this.endDate);
        this.currentReport = reportService.formatReportForUI(report);
        this.renderReport();
      } catch (error) {
        console.error('Error loading date range report:', error);
        this.showNotification('Error loading date range report', 'error');
      } finally {
        this.loading = false;
      }
    },

    async loadLast6MonthsData() {
      try {
        this.last6MonthsData = await reportService.getLast6MonthsReport();
        this.renderLast6MonthsChart();
      } catch (error) {
        console.error('Error loading 6-month data:', error);
      }
    },

    async generateReport() {
      switch (this.selectedPeriod) {
        case 'general':
          await this.loadGeneralReport();
          break;
        case 'year':
          await this.loadReportByYear();
          break;
        case 'month':
          await this.loadReportByMonth();
          break;
        case 'range':
          await this.loadReportByDateRange();
          break;
      }
    },

    renderReport() {
      if (!this.currentReport) return;

      const totalIncomeElement = document.getElementById('report-total-income');
      const totalExpensesElement = document.getElementById('report-total-expenses');
      const balanceElement = document.getElementById('report-balance');
      const transactionsElement = document.getElementById('report-total-transactions');
      const periodElement = document.getElementById('report-period');

      if (totalIncomeElement) {
        totalIncomeElement.textContent = `$${this.currentReport.totalIncome.toFixed(2)}`;
      }
      if (totalExpensesElement) {
        totalExpensesElement.textContent = `$${this.currentReport.totalExpenses.toFixed(2)}`;
      }
      if (balanceElement) {
        balanceElement.textContent = `$${this.currentReport.balance.toFixed(2)}`;
        if (this.currentReport.balance >= 0) {
          balanceElement.classList.add('text-green-600');
          balanceElement.classList.remove('text-red-600');
        } else {
          balanceElement.classList.add('text-red-600');
          balanceElement.classList.remove('text-green-600');
        }
      }
      if (transactionsElement) {
        transactionsElement.textContent = this.currentReport.totalTransactions;
      }
      if (periodElement) {
        periodElement.textContent = this.currentReport.period;
      }

      this.renderCurrentReportChart();
    },

    renderCurrentReportChart() {
      if (!this.currentReport) return;

      const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
          data: [this.currentReport.totalIncome, this.currentReport.totalExpenses],
          backgroundColor: ['#10B981', '#EF4444'],
          borderColor: ['#059669', '#DC2626'],
          borderWidth: 5
        }]
      };

      const ctx = document.getElementById('current-report-chart');
      if (ctx) {
        renderReportChart(ctx, chartData);
      }
    },

    renderLast6MonthsChart() {
      if (!this.last6MonthsData || this.last6MonthsData.length === 0) return;

      const chartData = {
        labels: this.last6MonthsData.map(item => item.period),
        datasets: [
          {
            label: 'Income',
            data: this.last6MonthsData.map(item => item.totalIncome),
            backgroundColor: '"#6495ED" ',
            borderColor: '"#6495ED" ',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: this.last6MonthsData.map(item => item.totalExpenses),
            backgroundColor: '#EF4444',
            borderColor: '#DC2626',
            borderWidth: 1
          }
        ]
      };

      const ctx = document.getElementById('last-6-months-chart');
      if (ctx) {
        renderReportChart(ctx, chartData);
      }
    },

    exportReport() {
      if (!this.currentReport) {
        this.showNotification('No report available to export', 'error');
        return;
      }

      const reportData = {
        ...this.currentReport,
        exportDate: new Date().toISOString(),
        generatedBy: 'Budget Buddy'
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${this.currentReport.period.replace(/\s+/g, '-').toLowerCase()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      this.showNotification('Report exported successfully', 'success');
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

    get formattedBalance() {
      if (!this.currentReport) return '$0.00';
      return `$${this.currentReport.balance.toFixed(2)}`;
    },

    get balanceColor() {
      if (!this.currentReport) return 'text-gray-600';
      return this.currentReport.balance >= 0 ? 'text-green-600' : 'text-red-600';
    },

    get balanceIcon() {
      if (!this.currentReport) return '';
      return this.currentReport.balance >= 0 ? '↗' : '↘';
    },

    get incomePercentage() {
      if (!this.currentReport) return '0%';
      const total = this.currentReport.totalIncome + this.currentReport.totalExpenses;
      if (total === 0) return '0%';
      return `${((this.currentReport.totalIncome / total) * 100).toFixed(1)}%`;
    },

    get expensePercentage() {
      if (!this.currentReport) return '0%';
      const total = this.currentReport.totalIncome + this.currentReport.totalExpenses;
      if (total === 0) return '0%';
      return `${((this.currentReport.totalExpenses / total) * 100).toFixed(1)}%`;
    }
  };
}