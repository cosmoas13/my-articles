const categoryService = require('../services/category.service');

class CategoryController {
  /**
   * Get all categories
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get categories', error: error.message });
    }
  }

  /**
   * Get category by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get category', error: error.message });
    }
  }

  /**
   * Create a new category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
      
      const category = await categoryService.createCategory({ name, description });
      res.status(201).json(category);
    } catch (error) {
      if (error.message === 'Category with this name already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
  }

  /**
   * Update a category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      
      const category = await categoryService.updateCategory(id, { name, description });
      res.status(200).json(category);
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Category with this name already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
  }

  /**
   * Delete a category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
  }
}

module.exports = new CategoryController();