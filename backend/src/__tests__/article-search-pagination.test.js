const request = require('supertest');
const app = require('../app');
const { db } = require('../config/database');
const { articles } = require('../schemas/article.schema');

describe('Article Search and Pagination API', () => {
  beforeAll(async () => {
    // Setup test data if needed
    // This is a simplified example - in a real scenario, you might want to use
    // a test database or mock the database calls
  });

  afterAll(async () => {
    // Clean up test data if needed
  });

  test('GET /api/articles should return paginated articles', async () => {
    const response = await request(app)
      .get('/api/articles')
      .query({ page: 1, limit: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('articles');
    expect(response.body).toHaveProperty('totalCount');
    expect(Array.isArray(response.body.articles)).toBe(true);
    expect(response.body.articles.length).toBeLessThanOrEqual(5);
  });

  test('GET /api/articles should handle search parameter', async () => {
    const searchTerm = 'test';
    const response = await request(app)
      .get('/api/articles')
      .query({ search: searchTerm });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('articles');
    
    // Check if returned articles contain the search term in title, content, or excerpt
    if (response.body.articles.length > 0) {
      const matchesSearch = response.body.articles.some(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(matchesSearch).toBe(true);
    }
  });

  test('GET /api/articles should combine search and pagination', async () => {
    const searchTerm = 'test';
    const page = 1;
    const limit = 3;
    
    const response = await request(app)
      .get('/api/articles')
      .query({ search: searchTerm, page, limit });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('articles');
    expect(response.body).toHaveProperty('totalCount');
    expect(Array.isArray(response.body.articles)).toBe(true);
    expect(response.body.articles.length).toBeLessThanOrEqual(limit);
  });

  test('GET /api/articles should handle invalid pagination parameters', async () => {
    const response = await request(app)
      .get('/api/articles')
      .query({ page: 'invalid', limit: 'invalid' });

    expect(response.status).toBe(200); // Should default to page 1, limit 10
    expect(response.body).toHaveProperty('articles');
    expect(Array.isArray(response.body.articles)).toBe(true);
  });

  test('GET /api/articles should handle empty search results', async () => {
    const response = await request(app)
      .get('/api/articles')
      .query({ search: 'nonexistenttermshouldnotmatchanything12345' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('articles');
    expect(Array.isArray(response.body.articles)).toBe(true);
    expect(response.body.articles.length).toBe(0);
    expect(response.body.totalCount).toBe(0);
  });
});