const tagService = require('../services/tag.service');

class TagController {
  /**
   * Get all tags
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllTags(req, res) {
    try {
      const tags = await tagService.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get tags', error: error.message });
    }
  }

  /**
   * Get tag by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getTagById(req, res) {
    try {
      const { id } = req.params;
      const tag = await tagService.getTagById(id);
      res.status(200).json(tag);
    } catch (error) {
      if (error.message === 'Tag not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to get tag', error: error.message });
    }
  }

  /**
   * Create a new tag
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createTag(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ message: 'Tag name is required' });
      }
      
      const tag = await tagService.createTag({ name });
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create tag', error: error.message });
    }
  }

  /**
   * Create multiple tags
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createTags(req, res) {
    try {
      const { tags } = req.body;
      
      if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ message: 'Tags array is required' });
      }
      
      const createdTags = await tagService.createTags(tags);
      res.status(201).json(createdTags);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create tags', error: error.message });
    }
  }

  /**
   * Delete a tag
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteTag(req, res) {
    try {
      const { id } = req.params;
      await tagService.deleteTag(id);
      res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
      if (error.message === 'Tag not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to delete tag', error: error.message });
    }
  }
}

module.exports = new TagController();