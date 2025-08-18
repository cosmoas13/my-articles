import {
  getArticles,
  getArticleBySlug,
  getArticleComments,
  submitComment
} from '../services/articleService';

import {
  getCategories,
  getCategoryById
} from '../services/categoryService';

import {
  getTags,
  getTagById
} from '../services/tagService';

import {
  login,
  register,
  isAuthenticated
} from '../services/authService';

// Mock axios
jest.mock('axios');

describe('API Integration Tests', () => {
  // Article API tests
  describe('Article API', () => {
    test('getArticles should fetch articles with pagination and search', async () => {
      const mockResponse = {
        data: {
          articles: [
            { id: 1, title: 'Test Article 1' },
            { id: 2, title: 'Test Article 2' }
          ],
          totalCount: 2
        }
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getArticles({ page: 1, limit: 10, search: 'test' });
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/articles?page=1&limit=10&search=test')
      );
    });
    
    test('getArticleBySlug should fetch article by slug', async () => {
      const mockResponse = {
        data: { id: 1, title: 'Test Article', slug: 'test-article' }
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getArticleBySlug('test-article');
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/articles/slug/test-article')
      );
    });
  });
  
  // Category API tests
  describe('Category API', () => {
    test('getCategories should fetch all categories', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Technology' },
          { id: 2, name: 'Science' }
        ]
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getCategories();
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/categories')
      );
    });
    
    test('getCategoryById should fetch category by id', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Technology' }
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getCategoryById(1);
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/categories/1')
      );
    });
  });
  
  // Tag API tests
  describe('Tag API', () => {
    test('getTags should fetch all tags', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'JavaScript' },
          { id: 2, name: 'React' }
        ]
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getTags();
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/tags')
      );
    });
  });
  
  // Comment API tests
  describe('Comment API', () => {
    test('getArticleComments should fetch comments for an article', async () => {
      const mockResponse = {
        data: [
          { id: 1, content: 'Great article!', articleId: 1 },
          { id: 2, content: 'Very informative', articleId: 1 }
        ]
      };
      
      require('axios').get.mockResolvedValue(mockResponse);
      
      const result = await getArticleComments(1);
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').get).toHaveBeenCalledWith(
        expect.stringContaining('/comments/article/1')
      );
    });
    
    test('submitComment should post a new comment', async () => {
      const mockComment = {
        articleId: 1,
        name: 'Test User',
        email: 'test@example.com',
        content: 'This is a test comment'
      };
      
      const mockResponse = {
        data: { id: 1, ...mockComment }
      };
      
      require('axios').post.mockResolvedValue(mockResponse);
      
      const result = await submitComment(mockComment);
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').post).toHaveBeenCalledWith(
        expect.stringContaining('/comments'),
        mockComment
      );
    });
  });
  
  // Auth API tests
  describe('Auth API', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });
    
    test('register should create a new user', async () => {
      const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const mockResponse = {
        data: { id: 1, name: 'Test User', email: 'test@example.com' }
      };
      
      require('axios').post.mockResolvedValue(mockResponse);
      
      const result = await register(mockUser);
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        mockUser
      );
    });
    
    test('login should authenticate user and store tokens', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const mockResponse = {
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com' },
          token: 'fake-token',
          refreshToken: 'fake-refresh-token'
        }
      };
      
      require('axios').post.mockResolvedValue(mockResponse);
      
      const result = await login(mockCredentials);
      
      expect(result).toEqual(mockResponse.data);
      expect(require('axios').post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        mockCredentials
      );
      
      // Check if tokens are stored in localStorage
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(localStorage.getItem('refreshToken')).toBe('fake-refresh-token');
      
      // Check if isAuthenticated returns true
      expect(isAuthenticated()).toBe(true);
    });
  });
});