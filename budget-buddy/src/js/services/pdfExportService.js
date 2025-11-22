import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class PDFExportService {
  constructor() {
    this.pdf = null;
  }

  /**
   * Genera un nombre de archivo descriptivo basado en el tipo de reporte
   * @param {Object} reportData - Datos del reporte
   * @returns {string} - Nombre del archivo
   */
  generateFileName(reportData) {
    const date = new Date().toISOString().split('T')[0];
    let fileName = `BudgetBuddy_Reporte_${date}`;

    if (reportData.year && reportData.month) {
      fileName = `BudgetBuddy_Reporte_${reportData.year}_${String(reportData.month).padStart(2, '0')}_${date}`;
    } else if (reportData.year) {
      fileName = `BudgetBuddy_Reporte_${reportData.year}_${date}`;
    } else if (reportData.startDate && reportData.endDate) {
      fileName = `BudgetBuddy_Reporte_${reportData.startDate}_a_${reportData.endDate}_${date}`;
    }

    return `${fileName}.pdf`;
  }

  /**
   * Prepara el elemento para la captura
   * @param {HTMLElement} element - Elemento a preparar
   */
  prepareElementForCapture(element) {
    // Guardar estilos originales
    const originalStyles = {
      backgroundColor: element.style.backgroundColor,
      padding: element.style.padding,
    };

    // Aplicar estilos temporales para mejor captura
    element.style.backgroundColor = '#ffffff';
    element.style.padding = '20px';

    return originalStyles;
  }

  /**
   * Restaura los estilos originales del elemento
   * @param {HTMLElement} element - Elemento a restaurar
   * @param {Object} originalStyles - Estilos originales
   */
  restoreElementStyles(element, originalStyles) {
    Object.keys(originalStyles).forEach(key => {
      element.style[key] = originalStyles[key];
    });
  }

  /**
   * Genera un PDF a partir de un elemento HTML
   * @param {string} elementId - ID del elemento a exportar
   * @param {Object} reportData - Datos del reporte para el nombre del archivo
   * @param {Object} options - Opciones adicionales
   */
  async exportReportToPDF(elementId, reportData, options = {}) {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Elemento con ID "${elementId}" no encontrado`);
      }

      // Mostrar indicador de carga
      this.showLoadingIndicator();

      // Preparar elemento para captura
      const originalStyles = this.prepareElementForCapture(element);

      // Configuración de html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Mayor calidad
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ...options.html2canvasOptions
      });

      // Restaurar estilos originales
      this.restoreElementStyles(element, originalStyles);

      // Calcular dimensiones del PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Crear PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      let position = 0;

      // Agregar imagen al PDF (con paginación si es necesario)
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Agregar metadata al PDF
      pdf.setProperties({
        title: `Budget Buddy - Reporte Financiero`,
        subject: 'Reporte Financiero Personal',
        author: 'Budget Buddy',
        keywords: 'finanzas, reporte, presupuesto',
        creator: 'Budget Buddy App'
      });

      // Generar nombre de archivo y descargar
      const fileName = this.generateFileName(reportData);
      pdf.save(fileName);

      // Ocultar indicador de carga
      this.hideLoadingIndicator();

      return {
        success: true,
        fileName: fileName,
        message: 'PDF generado exitosamente'
      };

    } catch (error) {
      console.error('Error generando PDF:', error);
      this.hideLoadingIndicator();
      throw error;
    }
  }

  /**
   * Genera un PDF con contenido personalizado
   * @param {Object} reportData - Datos del reporte
   */
  async generateCustomPDF(reportData) {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Encabezado
      pdf.setFillColor(70, 95, 255);
      pdf.rect(0, 0, pageWidth, 30, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text('Budget Buddy', pageWidth / 2, 15, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'normal');
      pdf.text('Reporte Financiero', pageWidth / 2, 23, { align: 'center' });

      yPosition = 40;

      // Información del período
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text(`Período: ${reportData.period || 'General'}`, 20, yPosition);
      yPosition += 10;

      if (reportData.startDate && reportData.endDate) {
        pdf.setFont(undefined, 'normal');
        pdf.text(`Desde: ${reportData.startDate} - Hasta: ${reportData.endDate}`, 20, yPosition);
        yPosition += 10;
      }

      yPosition += 5;

      // Métricas principales
      pdf.setFillColor(245, 247, 250);
      pdf.rect(15, yPosition, pageWidth - 30, 50, 'F');

      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Resumen Financiero', 20, yPosition + 10);

      yPosition += 20;
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      
      pdf.setTextColor(34, 197, 94); // green
      pdf.text(`Ingresos Totales:`, 20, yPosition);
      pdf.setFont(undefined, 'bold');
      pdf.text(`$${reportData.totalIncome?.toFixed(2) || '0.00'}`, 100, yPosition);

      yPosition += 10;
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(239, 68, 68); // red
      pdf.text(`Gastos Totales:`, 20, yPosition);
      pdf.setFont(undefined, 'bold');
      pdf.text(`$${reportData.totalExpenses?.toFixed(2) || '0.00'}`, 100, yPosition);

      yPosition += 10;
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(100, 116, 139); // gray
      pdf.text(`Balance:`, 20, yPosition);
      pdf.setFont(undefined, 'bold');
      const balanceColor = reportData.balance >= 0 ? [34, 197, 94] : [239, 68, 68];
      pdf.setTextColor(...balanceColor);
      pdf.text(`$${reportData.balance?.toFixed(2) || '0.00'}`, 100, yPosition);

      yPosition += 20;

      // Footer
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'italic');
      const footerText = `Generado el ${new Date().toLocaleDateString('es-ES')} - Budget Buddy`;
      pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Generar nombre de archivo y descargar
      const fileName = this.generateFileName(reportData);
      pdf.save(fileName);

      return {
        success: true,
        fileName: fileName,
        message: 'PDF generado exitosamente'
      };

    } catch (error) {
      console.error('Error generando PDF personalizado:', error);
      throw error;
    }
  }

  /**
   * Muestra un indicador de carga
   */
  showLoadingIndicator() {
    const existingIndicator = document.getElementById('pdf-loading-indicator');
    if (existingIndicator) return;

    const indicator = document.createElement('div');
    indicator.id = 'pdf-loading-indicator';
    indicator.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="border: 4px solid #f3f3f3; border-top: 4px solid #465fff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
          <p style="margin: 0; font-size: 16px; color: #333;">Generando PDF...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(indicator);
  }

  /**
   * Oculta el indicador de carga
   */
  hideLoadingIndicator() {
    const indicator = document.getElementById('pdf-loading-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

const pdfExportService = new PDFExportService();
export default pdfExportService;
