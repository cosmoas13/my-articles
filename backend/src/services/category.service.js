const { eq } = require('drizzle-orm');
const { db } = require('../db');
const { categories } = require('../db/schema');

class CategoryService {
  /**
   * Get all categories
   * @returns {Promise<Array>} - List of categories
   */
  async getAllCategories() {
    return await db.select().from(categories);
  }

  /**
   * Get category by ID
   * @param {number} id - Category ID
   * @returns {Promise<Object>} - Category object
   */
  async getCategoryById(id) {
    const result = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    
    if (result.length === 0) {
      throw new Error('Category not found');
    }
    
    return result[0];
  }

  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object>} - Newly created category
   */
  async createCategory(categoryData) {
    const { name, description } = categoryData;
    
    // Check if category already exists
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.name, name))
      .limit(1);
    
    if (existingCategory.length > 0) {
      throw new Error('Category with this name already exists');
    }
    
    // Create new category
    const newCategory = await db.insert(categories)
      .values({
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    
    return newCategory[0];
  }

  /**
   * Update a category
   * @param {number} id - Category ID
   * @param {Object} categoryData - Updated category data
   * @returns {Promise<Object>} - Updated category
   */
  async updateCategory(id, categoryData) {
    const { name, description } = categoryData;
    
    // Check if category exists
    await this.getCategoryById(id);
    
    // Check if name is being changed and if it already exists
    if (name) {
      const existingCategory = await db.select()
        .from(categories)
        .where(eq(categories.name, name))
        .limit(1);
      
      if (existingCategory.length > 0 && existingCategory[0].id !== id) {
        throw new Error('Category with this name already exists');
      }
    }
    
    // Update category
    const updatedCategory = await db.update(categories)
      .set({
        ...(name && { name }),
        ...(description !== undefined && { description }),
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();
    
    return updatedCategory[0];
  }

  /**
   * Delete a category
   * @param {number} id - Category ID
   * @returns {Promise<void>}
   */
  async deleteCategory(id) {
    // Check if category exists
    await this.getCategoryById(id);
    
    // Delete category
    await db.delete(categories)
      .where(eq(categories.id, id));
  }
}

module.exports = new CategoryService();