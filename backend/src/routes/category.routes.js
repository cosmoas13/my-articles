const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Protected routes - only authenticated users can create, update, delete categories
router.post('/', authMiddleware.authenticateToken, categoryController.createCategory);
router.put('/:id', authMiddleware.authenticateToken, categoryController.updateCategory);
router.delete('/:id', authMiddleware.authenticateToken, categoryController.deleteCategory);

module.exports = router;