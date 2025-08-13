const { eq, and, desc, sql } = require('drizzle-orm');
const { db } = require('../db');
const { articles, articleTags, tags, categories, users } = require('../db/schema');
const { comments } = require('../db/schema/comment.schema');
const tagService = require('./tag.service');

class ArticleService {
  /**
   * Generate a slug from a title
   * @param {string} title - Article title
   * @returns {string} - Generated slug
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Get all articles with pagination
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Articles with pagination info
   */
  async getArticles(options = {}) {
    const { page = 1, limit = 10, published = true, categoryId, authorId } = options;
    const offset = (page - 1) * limit;
    
    // Build where conditions
    const whereConditions = [];
    
    if (published !== undefined) {
      whereConditions.push(eq(articles.published, published));
    }
    
    if (categoryId) {
      whereConditions.push(eq(articles.categoryId, categoryId));
    }
    
    if (authorId) {
      whereConditions.push(eq(articles.authorId, authorId));
    }
    
    // Get total count for pagination
    const countResult = await db
      .select({ count: sql`count(*)` })
      .from(articles)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);
    
    const totalItems = Number(countResult[0].count);
    const totalPages = Math.ceil(totalItems / limit);
    
    // Get articles
    const articlesResult = await db
      .select({
        id: articles.id,
        title: articles.title,
        excerpt: articles.excerpt,
        slug: articles.slug,
        categoryId: articles.categoryId,
        authorId: articles.authorId,
        published: articles.published,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
      })
      .from(articles)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);
    
    // Get additional data for each article
    const articlesWithDetails = await Promise.all(
      articlesResult.map(async (article) => {
        // Get comments for this article (always included)
        const articleComments = await db.select()
          .from(comments)
          .where(eq(comments.articleId, article.id))
          .orderBy(desc(comments.createdAt));
        
        // Get category
        let category = null;
        if (article.categoryId) {
          const categoryResult = await db
            .select()
            .from(categories)
            .where(eq(categories.id, article.categoryId))
            .limit(1);
          
          if (categoryResult.length > 0) {
            category = categoryResult[0];
          }
        }
        
        // Get author
        const authorResult = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
          })
          .from(users)
          .where(eq(users.id, article.authorId))
          .limit(1);
        
        const author = authorResult.length > 0 ? authorResult[0] : null;
        
        // Get tags
        const tagsResult = await db
          .select({
            id: tags.id,
            name: tags.name,
          })
          .from(articleTags)
          .innerJoin(tags, eq(articleTags.tagId, tags.id))
          .where(eq(articleTags.articleId, article.id));
        
        return {
          ...article,
          category,
          author,
          tags: tagsResult,
          comments: articleComments
        };
      })
    );
    
    return {
      data: articlesWithDetails,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }

  /**
   * Get article by ID
   * @param {number} id - Article ID
   * @returns {Promise<Object>} - Article object with details
   */
  async getArticleById(id) {
    const articleResult = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);
    
    if (articleResult.length === 0) {
      throw new Error('Article not found');
    }
    
    const article = articleResult[0];
    
    // Get category
    let category = null;
    if (article.categoryId) {
      const categoryResult = await db
        .select()
        .from(categories)
        .where(eq(categories.id, article.categoryId))
        .limit(1);
      
      if (categoryResult.length > 0) {
        category = categoryResult[0];
      }
    }
    
    // Get author
    const authorResult = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, article.authorId))
      .limit(1);
    
    const author = authorResult.length > 0 ? authorResult[0] : null;
    
    // Get tags
    const tagsResult = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(articleTags)
      .innerJoin(tags, eq(articleTags.tagId, tags.id))
      .where(eq(articleTags.articleId, article.id));
    
    return {
      ...article,
      category,
      author,
      tags: tagsResult,
    };
  }

  /**
   * Get article by ID with comments
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Article with comments
   */
  async getArticleWithComments(id) {
    // Get article
    const article = await this.getArticleById(id);
    
    // Get comments for this article
    const articleComments = await db.select()
      .from(comments)
      .where(eq(comments.articleId, id))
      .orderBy(desc(comments.createdAt));
    
    return {
      ...article,
      comments: articleComments
    };
  }

  /**
   * Get article by slug
   * @param {string} slug - Article slug
   * @returns {Promise<Object>} - Article object with details
   */
  async getArticleBySlug(slug) {
    const articleResult = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    
    if (articleResult.length === 0) {
      throw new Error('Article not found');
    }
    
    return this.getArticleById(articleResult[0].id);
  }

  /**
   * Get article by slug with comments
   * @param {string} slug - Article slug
   * @returns {Promise<Object>} - Article with comments
   */
  async getArticleWithCommentsBySlug(slug) {
    // Get article
    const articleResult = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    
    if (articleResult.length === 0) {
      throw new Error('Article not found');
    }
    
    // Get article with details and comments
    return this.getArticleWithComments(articleResult[0].id);
  }

  /**
   * Create a new article
   * @param {Object} articleData - Article data
   * @param {number} authorId - Author ID
   * @returns {Promise<Object>} - Newly created article
   */
  async createArticle(articleData, authorId) {
    const { title, content, excerpt, categoryId, tags: tagNames = [], published = false } = articleData;
    
    // Generate slug
    let slug = this.generateSlug(title);
    
    // Check if slug already exists
    const existingSlug = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    
    // If slug exists, append a random string
    if (existingSlug.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-6)}`;
    }
    
    // Create article
    const newArticle = await db.insert(articles)
      .values({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        slug,
        categoryId,
        authorId,
        published,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    
    const article = newArticle[0];
    
    // Process tags
    if (tagNames.length > 0) {
      const createdTags = await tagService.createTags(tagNames);
      
      // Create article-tag relations
      for (const tag of createdTags) {
        await db.insert(articleTags)
          .values({
            articleId: article.id,
            tagId: tag.id,
            createdAt: new Date(),
          });
      }
    }
    
    // Return complete article with details
    return this.getArticleById(article.id);
  }

  /**
   * Update an article
   * @param {number} id - Article ID
   * @param {Object} articleData - Updated article data
   * @returns {Promise<Object>} - Updated article
   */
  async updateArticle(id, articleData) {
    // Check if article exists
    await this.getArticleById(id);
    
    const { title, content, excerpt, categoryId, tags: tagNames, published } = articleData;
    
    const updateData = {};
    
    // Update fields if provided
    if (title !== undefined) {
      updateData.title = title;
      
      // Generate new slug if title changes
      let slug = this.generateSlug(title);
      
      // Check if slug already exists (excluding current article)
      const existingSlug = await db
        .select()
        .from(articles)
        .where(and(eq(articles.slug, slug), sql`id != ${id}`))
        .limit(1);
      
      // If slug exists, append a random string
      if (existingSlug.length > 0) {
        slug = `${slug}-${Date.now().toString().slice(-6)}`;
      }
      
      updateData.slug = slug;
    }
    
    if (content !== undefined) {
      updateData.content = content;
      
      // Update excerpt if not provided but content is updated
      if (excerpt === undefined) {
        updateData.excerpt = content.substring(0, 150) + '...';
      }
    }
    
    if (excerpt !== undefined) {
      updateData.excerpt = excerpt;
    }
    
    if (categoryId !== undefined) {
      updateData.categoryId = categoryId;
    }
    
    if (published !== undefined) {
      updateData.published = published;
    }
    
    updateData.updatedAt = new Date();
    
    // Update article
    await db.update(articles)
      .set(updateData)
      .where(eq(articles.id, id));
    
    // Update tags if provided
    if (tagNames && Array.isArray(tagNames)) {
      // Delete existing article-tag relations
      await db.delete(articleTags)
        .where(eq(articleTags.articleId, id));
      
      // Create new tags and relations
      const createdTags = await tagService.createTags(tagNames);
      
      for (const tag of createdTags) {
        await db.insert(articleTags)
          .values({
            articleId: id,
            tagId: tag.id,
            createdAt: new Date(),
          });
      }
    }
    
    // Return updated article with details
    return this.getArticleById(id);
  }

  /**
   * Delete an article
   * @param {number} id - Article ID
   * @returns {Promise<void>}
   */
  async deleteArticle(id) {
    // Check if article exists
    await this.getArticleById(id);
    
    // Delete article-tag relations
    await db.delete(articleTags)
      .where(eq(articleTags.articleId, id));
    
    // Delete article
    await db.delete(articles)
      .where(eq(articles.id, id));
  }
}

module.exports = new ArticleService();