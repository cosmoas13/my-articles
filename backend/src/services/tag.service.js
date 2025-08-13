const { eq } = require('drizzle-orm');
const { db } = require('../db');
const { tags } = require('../db/schema');

class TagService {
  /**
   * Get all tags
   * @returns {Promise<Array>} - List of tags
   */
  async getAllTags() {
    return await db.select().from(tags);
  }

  /**
   * Get tag by ID
   * @param {number} id - Tag ID
   * @returns {Promise<Object>} - Tag object
   */
  async getTagById(id) {
    const result = await db.select()
      .from(tags)
      .where(eq(tags.id, id))
      .limit(1);
    
    if (result.length === 0) {
      throw new Error('Tag not found');
    }
    
    return result[0];
  }

  /**
   * Create a new tag
   * @param {Object} tagData - Tag data
   * @returns {Promise<Object>} - Newly created tag
   */
  async createTag(tagData) {
    const { name } = tagData;
    
    // Check if tag already exists
    const existingTag = await db.select()
      .from(tags)
      .where(eq(tags.name, name))
      .limit(1);
    
    if (existingTag.length > 0) {
      // Return existing tag instead of creating a new one
      return existingTag[0];
    }
    
    // Create new tag
    const newTag = await db.insert(tags)
      .values({
        name,
        createdAt: new Date(),
      })
      .returning();
    
    return newTag[0];
  }

  /**
   * Create multiple tags at once
   * @param {Array<string>} tagNames - Array of tag names
   * @returns {Promise<Array>} - Array of created/existing tags
   */
  async createTags(tagNames) {
    const createdTags = [];
    
    // Process each tag name
    for (const name of tagNames) {
      const tag = await this.createTag({ name });
      createdTags.push(tag);
    }
    
    return createdTags;
  }

  /**
   * Delete a tag
   * @param {number} id - Tag ID
   * @returns {Promise<void>}
   */
  async deleteTag(id) {
    // Check if tag exists
    await this.getTagById(id);
    
    // Delete tag
    await db.delete(tags)
      .where(eq(tags.id, id));
  }
}

module.exports = new TagService();