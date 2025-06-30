import { API_CONFIG, apiRequest } from '../config/api.js';

class CategoryService {
  constructor() {
    this.categories = [];
    this.loaded = false;
  }

  // Cargar todas las categorías
  async loadCategories() {
    if (this.loaded) return this.categories;
    
    try {
      this.categories = await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.LIST);
      this.loaded = true;
      return this.categories;
    } catch (error) {
      console.error('Error cargando categorías:', error);
      return [];
    }
  }

  // Obtener categoría por ID
  async getCategoryById(id) {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.GET_BY_ID(id));
    } catch (error) {
      console.error('Error obteniendo categoría:', error);
      return null;
    }
  }

  // Crear nueva categoría
  async createCategory(categoryData) {
    try {
      const newCategory = await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(categoryData)
      });
      
      // Actualizar la lista local
      this.categories.push(newCategory);
      return newCategory;
    } catch (error) {
      console.error('Error creando categoría:', error);
      throw error;
    }
  }

  // Eliminar categoría
  async deleteCategory(id) {
    try {
      await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.DELETE(id), {
        method: 'DELETE'
      });
      
      // Actualizar la lista local
      this.categories = this.categories.filter(cat => cat.id !== id);
      return true;
    } catch (error) {
      console.error('Error eliminando categoría:', error);
      throw error;
    }
  }

  // Obtener categorías para un select
  getCategoriesForSelect() {
    return this.categories.map(category => ({
      value: category.id,
      label: category.name
    }));
  }

  // Obtener nombre de categoría por ID
  getCategoryName(id) {
    const category = this.categories.find(cat => cat.id === id);
    return category ? category.name : 'Sin categoría';
  }

  // Limpiar caché
  clearCache() {
    this.categories = [];
    this.loaded = false;
  }
}

// Instancia singleton
const categoryService = new CategoryService();
export default categoryService; 