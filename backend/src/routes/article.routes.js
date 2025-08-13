const express = require('express');
const articleController = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', articleController.getArticles);
router.get('/id/:id', articleController.getArticleById);
router.get('/slug/:slug', articleController.getArticleBySlug);

// Protected routes - only authenticated users can create, update, delete articles
router.post('/', authMiddleware.authenticateToken, articleController.createArticle);
router.put('/:id', authMiddleware.authenticateToken, articleController.updateArticle);
router.delete('/:id', authMiddleware.authenticateToken, articleController.deleteArticle);

module.exports = router;