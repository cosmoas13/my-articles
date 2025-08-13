const { db } = require('../db');
const { comments } = require('../db/schema');
const { eq } = require('drizzle-orm');

class CommentService {
  /**
   * Get all comments for an article
   * @param {string} articleId - The article ID
   * @returns {Promise<Array>} - Array of comments
   */
  async getCommentsByArticleId(articleId) {
    return await db.select().from(comments).where(eq(comments.articleId, articleId));
  }

  /**
   * Create a new comment
   * @param {Object} commentData - The comment data
   * @returns {Promise<Object>} - The created comment
   */
  async createComment(commentData) {
    // If isAnonymous is true, remove name and email
    if (commentData.isAnonymous) {
      commentData.name = 'Anonymous';
      commentData.email = null;
    }

    const result = await db.insert(comments).values(commentData).returning();
    return result[0];
  }

  /**
   * Delete a comment
   * @param {string} id - The comment ID
   * @returns {Promise<void>}
   */
  async deleteComment(id) {
    const result = await db.select().from(comments).where(eq(comments.id, id));
    
    if (result.length === 0) {
      throw new Error('Comment not found');
    }
    
    await db.delete(comments).where(eq(comments.id, id));
  }
}

module.exports = new CommentService();