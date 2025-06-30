import { API_CONFIG, apiRequest } from '../config/api.js';

class AdviceService {
  constructor() {
    this.pendingRequests = [];
    this.myRequests = [];
    this.myAssignments = [];
    this.selectedRequest = null;
    this.userRole = null;
  }

  async getUserRole() {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role || 'USER';
      }
      return 'USER';
    } catch (error) {
      console.error('Error obteniendo rol de usuario:', error);
      return 'USER';
    }
  }

  async createAdviceRequest(requestData) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.CREATE_REQUEST, {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      return response;
    } catch (error) {
      console.error('Error creando solicitud de asesoría:', error);
      throw error;
    }
  }

  async getPendingRequests() {
    try {
      this.pendingRequests = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_PENDING_REQUESTS);
      return this.pendingRequests;
    } catch (error) {
      console.error('Error obteniendo solicitudes pendientes:', error);
      return [];
    }
  }

  async getMyRequests() {
    try {
      this.myRequests = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_REQUESTS);
      return this.myRequests;
    } catch (error) {
      console.error('Error obteniendo mis solicitudes:', error);
      return [];
    }
  }

  async getMyAssignments() {
    try {
      this.myAssignments = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_ASSIGNMENTS);
      return this.myAssignments;
    } catch (error) {
      console.error('Error obteniendo mis asignaciones:', error);
      return [];
    }
  }

  async acceptRequest(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.ACCEPT_REQUEST(requestId), {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error aceptando solicitud:', error);
      throw error;
    }
  }

  async startAdvice(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.START_ADVICE(requestId), {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error iniciando asesoría:', error);
      throw error;
    }
  }

  async completeRequest(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.COMPLETE_REQUEST(requestId), {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error completando solicitud:', error);
      throw error;
    }
  }

  async cancelRequest(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.CANCEL_REQUEST(requestId), {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error cancelando solicitud:', error);
      throw error;
    }
  }

  async getReport(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_REPORT(requestId));
      return response;
    } catch (error) {
      console.error('Error obteniendo reporte:', error);
      throw error;
    }
  }

  async provideAdvice(requestId, advice) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.PROVIDE_ADVICE(requestId), {
        method: 'POST',
        body: JSON.stringify({ advice })
      });
      return response;
    } catch (error) {
      console.error('Error proporcionando asesoría:', error);
      throw error;
    }
  }

  formatRequestForUI(request) {
    return {
      id: request.id,
      title: request.title,
      description: request.description,
      startDate: request.startDate,
      endDate: request.endDate,
      createdAt: request.createdAt,
      status: request.status,
      userName: request.userName,
      advisorName: request.advisorName,
      acceptedAt: request.acceptedAt,
      completedAt: request.completedAt,
      formattedCreatedAt: new Date(request.createdAt).toLocaleString('es-ES'),
      formattedAcceptedAt: request.acceptedAt ? new Date(request.acceptedAt).toLocaleString('es-ES') : null,
      formattedCompletedAt: request.completedAt ? new Date(request.completedAt).toLocaleString('es-ES') : null,
      statusLabel: this.getStatusLabel(request.status),
      statusColor: this.getStatusColor(request.status)
    };
  }

  getStatusLabel(status) {
    const labels = {
      'PENDING': 'Pendiente',
      'ACCEPTED': 'Aceptada',
      'IN_PROGRESS': 'En Progreso',
      'COMPLETED': 'Completada',
      'CANCELLED': 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusColor(status) {
    const colors = {
      'PENDING': 'text-yellow-600 bg-yellow-100',
      'ACCEPTED': 'text-blue-600 bg-blue-100',
      'IN_PROGRESS': 'text-orange-600 bg-orange-100',
      'COMPLETED': 'text-green-600 bg-green-100',
      'CANCELLED': 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  }

  async isAdvisor() {
    if (!this.userRole) {
      this.userRole = await this.getUserRole();
    }
    return this.userRole === 'ADVISOR';
  }

  clearCache() {
    this.pendingRequests = [];
    this.myRequests = [];
    this.myAssignments = [];
    this.selectedRequest = null;
  }
}

const adviceService = new AdviceService();
export default adviceService; 