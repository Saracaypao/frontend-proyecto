export const StorageService = {
  saveSortPreference(sortBy, sortOrder) {
    const preference = {
      sortBy,
      sortOrder,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('sortPreference', JSON.stringify(preference));
  },

  getSortPreference() {
    const preference = localStorage.getItem('sortPreference');
    return preference ? JSON.parse(preference) : null;
  },

  resetSortPreference() {
    localStorage.removeItem('sortPreference');
  },

  hasSortPreference() {
    return localStorage.getItem('sortPreference') !== null;
  }
};