import axiosInstance from '../utils/axios';

const ArticleService = {
  /**
   * Get all articles with pagination and filters
   * @param {Object} options - Query options
   * @param {number} options.page - Page number
   * @param {number} options.limit - Items per page
   * @param {boolean} options.published - Filter by published status
   * @param {string} options.categoryId - Filter by category ID
   * @param {string} options.authorId - Filter by author ID
   * @param {string} options.search - Search term
   * @returns {Promise<Object>} - Articles with pagination info
   */
  getArticles: async (options = {}) => {
    const {
      page = 1,
      limit = 10,
      published = true,
      categoryId,
      authorId,
      search,
    } = options;

    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    params.append('published', published);

    if (categoryId) params.append('categoryId', categoryId);
    if (authorId) params.append('authorId', authorId);
    if (search) params.append('search', search);

    const response = await axiosInstance.get(`/articles?${params.toString()}`);
    return response.data;
  },

  /**
   * Get article by ID with comments
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Article with comments
   */
  getArticleById: async (id) => {
    const response = await axiosInstance.get(`/articles/id/${id}`);
    return response.data;
  },

  /**
   * Get article by slug with comments
   * @param {string} slug - Article slug
   * @returns {Promise<Object>} - Article with comments
   */
  getArticleBySlug: async (slug) => {
    const response = await axiosInstance.get(`/articles/slug/${slug}`);
    return response.data;
  },

  /**
   * Create a new article
   * @param {Object} articleData - Article data
   * @param {string} articleData.title - Article title
   * @param {string} articleData.content - Article content
   * @param {string} articleData.categoryId - Category ID
   * @param {Array<string>} articleData.tags - Array of tag IDs
   * @param {boolean} articleData.published - Published status
   * @returns {Promise<Object>} - Created article
   */
  createArticle: async (articleData) => {
    const response = await axiosInstance.post('/articles', articleData);
    return response.data;
  },

  /**
   * Update an article
   * @param {string} id - Article ID
   * @param {Object} articleData - Article data to update
   * @returns {Promise<Object>} - Updated article
   */
  updateArticle: async (id, articleData) => {
    const response = await axiosInstance.put(`/articles/${id}`, articleData);
    return response.data;
  },

  /**
   * Delete an article
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Delete response
   */
  deleteArticle: async (id) => {
    const response = await axiosInstance.delete(`/articles/${id}`);
    return response.data;
  },
};

export default ArticleService;