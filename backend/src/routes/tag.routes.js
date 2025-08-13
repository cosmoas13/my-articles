const express = require('express');
const tagController = require('../controllers/tag.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);

// Protected routes - only authenticated users can create, delete tags
router.post('/', authMiddleware.authenticateToken, tagController.createTag);
router.post('/batch', authMiddleware.authenticateToken, tagController.createTags);
router.delete('/:id', authMiddleware.authenticateToken, tagController.deleteTag);

module.exports = router;