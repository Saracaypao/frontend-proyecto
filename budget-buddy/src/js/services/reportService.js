import { API_CONFIG, apiRequest } from '../config/api.js';

class ReportService {
  constructor() {
    this.currentReport = null;
  }

  async getGeneralReport() {
    try {
      const report = await apiRequest(API_CONFIG.ENDPOINTS.REPORTS.GENERAL);
      this.currentReport = report;
      return report;
    } catch (error) {
      console.error('Error obteniendo reporte general:', error);
      throw error;
    }
  }

  async getReportByYear(year) {
    try {
      const report = await apiRequest(`${API_CONFIG.ENDPOINTS.REPORTS.BY_YEAR}/${year}`);
      this.currentReport = report;
      return report;
    } catch (error) {
      console.error('Error obteniendo reporte por año:', error);
      throw error;
    }
  }

  async getReportByMonth(year, month) {
    try {
      const report = await apiRequest(`${API_CONFIG.ENDPOINTS.REPORTS.BY_MONTH}/${year}/${month}`);
      this.currentReport = report;
      return report;
    } catch (error) {
      console.error('Error obteniendo reporte por mes:', error);
      throw error;
    }
  }

  async getReportByDateRange(startDate, endDate) {
    try {
      const queryParams = new URLSearchParams({
        startDate: startDate,
        endDate: endDate
      });
      const report = await apiRequest(`${API_CONFIG.ENDPOINTS.REPORTS.BY_RANGE}?${queryParams.toString()}`);
      this.currentReport = report;
      return report;
    } catch (error) {
      console.error('Error obteniendo reporte por rango:', error);
      throw error;
    }
  }

  formatReportForUI(report) {
    return {
      period: report.period || 'General',
      totalIncome: report.totalIncome || 0,
      totalExpenses: report.totalExpenses || 0,
      balance: report.balance || 0,
      totalTransactions: report.totalTransactions || 0,
      currency: report.currency || 'USD',
      year: report.year,
      month: report.month,
      startDate: report.startDate,
      endDate: report.endDate,
      daysInRange: report.daysInRange
    };
  }

  async getLast6MonthsReport() {
    try {
      const currentDate = new Date();
      const reports = [];
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        try {
          const report = await this.getReportByMonth(year, month);
          reports.push(this.formatReportForUI(report));
        } catch (error) {
          console.warn(`No se pudo obtener reporte para ${year}/${month}:`, error);
          
          reports.push({
            period: `${year}/${month.toString().padStart(2, '0')}`,
            totalIncome: 0,
            totalExpenses: 0,
            balance: 0,
            totalTransactions: 0,
            year: year,
            month: month
          });
        }
      }
      
      return reports;
    } catch (error) {
      console.error('Error generando reporte de 6 meses:', error);
      throw error;
    }
  }

  getAvailableYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 5; year--) {
      years.push(year);
    }
    return years;
  }

  getAvailableMonths() {
    return [
      { value: 1, label: 'Enero' },
      { value: 2, label: 'Febrero' },
      { value: 3, label: 'Marzo' },
      { value: 4, label: 'Abril' },
      { value: 5, label: 'Mayo' },
      { value: 6, label: 'Junio' },
      { value: 7, label: 'Julio' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Septiembre' },
      { value: 10, label: 'Octubre' },
      { value: 11, label: 'Noviembre' },
      { value: 12, label: 'Diciembre' }
    ];
  }
}

const reportService = new ReportService();
export default reportService; 