const express = require('express');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/article/:articleId', commentController.getCommentsByArticleId);
router.post('/', commentController.createComment);

// Protected routes - only authenticated users can delete comments
router.delete('/:id', authMiddleware.authenticateToken, commentController.deleteComment);

module.exports = router;