const articleService = require('../services/article.service');

class ArticleController {
  /**
   * Get all articles with pagination
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */

  /**
   * Get article with comments
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getArticleWithComments(req, res) {
    try {
      const { id } = req.params;
      const article = await articleService.getArticleWithComments(id);
      res.status(200).json(article);
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get article with comments', error: error.message });
    }
  }
  async getArticles(req, res) {
    try {
      const { page, limit, published, categoryId, authorId, search } = req.query;

      const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        published: published === undefined ? true : published === 'true',
        categoryId: categoryId || undefined,
        authorId: authorId || undefined,
        search: search || undefined
      };

      const result = await articleService.getArticles(options);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get articles', error: error.message });
    }
  }

  /**
   * Get article by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getArticleById(req, res) {
    try {
      const { id } = req.params;

      // Selalu gunakan getArticleWithComments untuk mendapatkan artikel dengan komentar
      const article = await articleService.getArticleWithComments(id);

      res.status(200).json(article);
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get article', error: error.message });
    }
  }

  /**
   * Get article by slug
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getArticleBySlug(req, res) {
    try {
      const { slug } = req.params;

      // Selalu gunakan getArticleWithCommentsBySlug untuk mendapatkan artikel dengan komentar
      const article = await articleService.getArticleWithCommentsBySlug(slug);

      res.status(200).json(article);
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get article', error: error.message });
    }
  }

  /**
   * Get article with comments by slug
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getArticleWithCommentsBySlug(req, res) {
    try {
      const { slug } = req.params;
      const article = await articleService.getArticleWithCommentsBySlug(slug);
      res.status(200).json(article);
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get article with comments', error: error.message });
    }
  }

  /**
   * Create a new article
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createArticle(req, res) {
    try {
      const { title, content, excerpt, categoryId, tags, published } = req.body;
      const authorId = req.user.userId;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const article = await articleService.createArticle(
        { title, content, excerpt, categoryId, tags, published },
        authorId
      );

      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create article', error: error.message });
    }
  }

  /**
   * Update an article
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateArticle(req, res) {
    try {
      const { id } = req.params;
      const { title, content, excerpt, categoryId, tags, published } = req.body;
      const authorId = req.user.userId;

      // Get the article to check ownership
      const article = await articleService.getArticleById(id);

      // Check if the user is the author of the article
      if (article.authorId !== authorId) {
        return res.status(403).json({ message: 'You are not authorized to update this article' });
      }

      const updatedArticle = await articleService.updateArticle(
        id,
        { title, content, excerpt, categoryId, tags, published }
      );

      res.status(200).json(updatedArticle);
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to update article', error: error.message });
    }
  }

  /**
   * Delete an article
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteArticle(req, res) {
    try {
      const { id } = req.params;
      const authorId = req.user.userId;

      // Get the article to check ownership
      const article = await articleService.getArticleById(id);

      // Check if the user is the author of the article
      if (article.authorId !== authorId) {
        return res.status(403).json({ message: 'You are not authorized to delete this article' });
      }

      await articleService.deleteArticle(id);
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      if (error.message === 'Article not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to delete article', error: error.message });
    }
  }
}

module.exports = new ArticleController();