import axiosInstance from '../utils/axios';

const CommentService = {
  /**
   * Get all comments for an article
   * @param {string} articleId - Article ID
   * @returns {Promise<Array>} - List of comments
   */
  getCommentsByArticleId: async (articleId) => {
    const response = await axiosInstance.get(`/comments/article/${articleId}`);
    return response.data;
  },

  /**
   * Create a new comment
   * @param {Object} commentData - Comment data
   * @param {string} commentData.content - Comment content
   * @param {string} commentData.articleId - Article ID
   * @param {string} commentData.name - Commenter name (optional if anonymous)
   * @param {string} commentData.email - Commenter email (optional if anonymous)
   * @param {boolean} commentData.isAnonymous - Whether comment is anonymous
   * @returns {Promise<Object>} - Created comment
   */
  createComment: async (commentData) => {
    const response = await axiosInstance.post('/comments', commentData);
    return response.data;
  },

  /**
   * Delete a comment
   * @param {string} id - Comment ID
   * @returns {Promise<Object>} - Delete response
   */
  deleteComment: async (id) => {
    const response = await axiosInstance.delete(`/comments/${id}`);
    return response.data;
  },
};

export default CommentService;