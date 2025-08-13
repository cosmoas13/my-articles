const commentService = require('../services/comment.service');
const articleService = require('../services/article.service');

class CommentController {
  /**
   * Get all comments for an article
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getCommentsByArticleId(req, res) {
    try {
      const { articleId } = req.params;
      
      // Verify article exists
      try {
        await articleService.getArticleById(articleId);
      } catch (error) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      const comments = await commentService.getCommentsByArticleId(articleId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
  }

  /**
   * Create a new comment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createComment(req, res) {
    try {
      const { content, articleId, name, email, isAnonymous } = req.body;
      
      // Validate required fields
      if (!content || !articleId) {
        return res.status(400).json({ message: 'Comment content and article ID are required' });
      }
      
      // Validate article exists
      try {
        await articleService.getArticleById(articleId);
      } catch (error) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      // If not anonymous, name is required
      if (!isAnonymous && !name) {
        return res.status(400).json({ message: 'Name is required for non-anonymous comments' });
      }
      
      const comment = await commentService.createComment({
        content,
        articleId,
        name: isAnonymous ? 'Anonymous' : name,
        email: isAnonymous ? null : email,
        isAnonymous: !!isAnonymous
      });
      
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
  }

  /**
   * Delete a comment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      
      await commentService.deleteComment(id);
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      if (error.message === 'Comment not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to delete comment', error: error.message });
    }
  }
}

module.exports = new CommentController();