import axiosInstance from '../utils/axios';

const TagService = {
  /**
   * Get all tags
   * @returns {Promise<Array>} - List of tags
   */
  getAllTags: async () => {
    const response = await axiosInstance.get('/tags');
    return response.data;
  },

  /**
   * Get tag by ID
   * @param {string} id - Tag ID
   * @returns {Promise<Object>} - Tag details
   */
  getTagById: async (id) => {
    const response = await axiosInstance.get(`/tags/${id}`);
    return response.data;
  },

  /**
   * Create a new tag
   * @param {Object} tagData - Tag data
   * @param {string} tagData.name - Tag name
   * @returns {Promise<Object>} - Created tag
   */
  createTag: async (tagData) => {
    const response = await axiosInstance.post('/tags', tagData);
    return response.data;
  },

  /**
   * Create multiple tags
   * @param {Array<string>} tags - Array of tag names
   * @returns {Promise<Array>} - Created tags
   */
  createTags: async (tags) => {
    const response = await axiosInstance.post('/tags/batch', { tags });
    return response.data;
  },

  /**
   * Delete a tag
   * @param {string} id - Tag ID
   * @returns {Promise<Object>} - Delete response
   */
  deleteTag: async (id) => {
    const response = await axiosInstance.delete(`/tags/${id}`);
    return response.data;
  },
};

export default TagService;