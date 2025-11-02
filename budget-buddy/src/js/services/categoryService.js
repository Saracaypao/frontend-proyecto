import { API_CONFIG, apiRequest } from '../config/api.js';

class CategoryService {
  constructor() {
    this.categories = [];
    this.loaded = false;
  }

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

  async getCategoryById(id) {
    try {
      return await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.GET_BY_ID(id));
    } catch (error) {
      console.error('Error obteniendo categoría:', error);
      return null;
    }
  }

  async createCategory(categoryData) {
    try {
      const newCategory = await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(categoryData)
      });
      
      this.categories.push(newCategory);
      return newCategory;
    } catch (error) {
      console.error('Error creando categoría:', error);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES.DELETE(id), {
        method: 'DELETE'
      });
      
      this.categories = this.categories.filter(cat => cat.id !== id);
      return true;
    } catch (error) {
      console.error('Error eliminando categoría:', error);
      throw error;
    }
  }

  getCategoriesForSelect() {
    return this.categories.map(category => ({
      value: category.id,
      label: category.name
    }));
  }

  getCategoryName(id) {
    const category = this.categories.find(cat => cat.id === id);
    return category ? category.name : 'Sin categoría';
  }

  clearCache() {
    this.categories = [];
    this.loaded = false;
  }
}

const categoryService = new CategoryService();
export default categoryService; 