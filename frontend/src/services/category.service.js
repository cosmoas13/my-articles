import axiosInstance from '../utils/axios';

const CategoryService = {
  /**
   * Get all categories
   * @returns {Promise<Array>} - List of categories
   */
  getAllCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  /**
   * Get category by ID
   * @param {string} id - Category ID
   * @returns {Promise<Object>} - Category details
   */
  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @param {string} categoryData.name - Category name
   * @param {string} categoryData.description - Category description
   * @returns {Promise<Object>} - Created category
   */
  createCategory: async (categoryData) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  },

  /**
   * Update a category
   * @param {string} id - Category ID
   * @param {Object} categoryData - Category data to update
   * @returns {Promise<Object>} - Updated category
   */
  updateCategory: async (id, categoryData) => {
    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  /**
   * Delete a category
   * @param {string} id - Category ID
   * @returns {Promise<Object>} - Delete response
   */
  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },
};

export default CategoryService;