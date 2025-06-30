import { API_CONFIG, apiRequest } from '../config/api.js';

class AdviceService {
  constructor() {
    this.pendingRequests = [];
    this.myRequests = [];
    this.myAssignments = [];
    this.selectedRequest = null;
    this.userRole = null;
  }

  // Obtener rol del usuario (ADVISOR o USER)
  async getUserRole() {
    try {
      // Obtener el rol del usuario desde el token JWT
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

  // Crear una nueva solicitud de asesoría
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

  // Obtener solicitudes pendientes (para asesores)
  async getPendingRequests() {
    try {
      this.pendingRequests = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_PENDING_REQUESTS);
      return this.pendingRequests;
    } catch (error) {
      console.error('Error obteniendo solicitudes pendientes:', error);
      return [];
    }
  }

  // Obtener mis solicitudes (para usuarios)
  async getMyRequests() {
    try {
      this.myRequests = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_REQUESTS);
      return this.myRequests;
    } catch (error) {
      console.error('Error obteniendo mis solicitudes:', error);
      return [];
    }
  }

  // Obtener mis asignaciones (para asesores)
  async getMyAssignments() {
    try {
      this.myAssignments = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_MY_ASSIGNMENTS);
      return this.myAssignments;
    } catch (error) {
      console.error('Error obteniendo mis asignaciones:', error);
      return [];
    }
  }

  // Aceptar una solicitud de asesoría
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

  // Iniciar asesoría
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

  // Completar solicitud
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

  // Cancelar solicitud
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

  // Obtener reporte de una solicitud (para asesores)
  async getReport(requestId) {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.ADVICE.GET_REPORT(requestId));
      return response;
    } catch (error) {
      console.error('Error obteniendo reporte:', error);
      throw error;
    }
  }

  // Proporcionar asesoría (para asesores)
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

  // Formatear solicitud para mostrar en la UI
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

  // Obtener etiqueta del estado
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

  // Obtener color del estado
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

  // Verificar si el usuario actual es un advisor
  async isAdvisor() {
    if (!this.userRole) {
      this.userRole = await this.getUserRole();
    }
    return this.userRole === 'ADVISOR';
  }

  // Limpiar caché
  clearCache() {
    this.pendingRequests = [];
    this.myRequests = [];
    this.myAssignments = [];
    this.selectedRequest = null;
  }
}

// Instancia singleton
const adviceService = new AdviceService();
export default adviceService; 