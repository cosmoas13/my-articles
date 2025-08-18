import { getArticles } from '../services/articleService';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('Article Search and Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getArticles fetches articles with search parameter', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        articles: [
          { id: 1, title: 'Test Article 1', slug: 'test-article-1' },
          { id: 2, title: 'Test Article 2', slug: 'test-article-2' },
        ],
        totalCount: 2
      }
    };

    // Setup axios mock
    axios.get.mockResolvedValue(mockResponse);

    // Call the function with search parameter
    const result = await getArticles({ search: 'test' });

    // Verify axios was called with correct URL including search parameter
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('search=test')
    );

    // Verify the returned data
    expect(result).toEqual(mockResponse.data);
    expect(result.articles.length).toBe(2);
    expect(result.totalCount).toBe(2);
  });

  test('getArticles fetches articles with pagination parameters', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        articles: [
          { id: 3, title: 'Test Article 3', slug: 'test-article-3' },
          { id: 4, title: 'Test Article 4', slug: 'test-article-4' },
        ],
        totalCount: 10
      }
    };

    // Setup axios mock
    axios.get.mockResolvedValue(mockResponse);

    // Call the function with pagination parameters
    const result = await getArticles({ page: 2, limit: 2 });

    // Verify axios was called with correct URL including pagination parameters
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('page=2')
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('limit=2')
    );

    // Verify the returned data
    expect(result).toEqual(mockResponse.data);
    expect(result.articles.length).toBe(2);
    expect(result.totalCount).toBe(10);
  });

  test('getArticles handles errors gracefully', async () => {
    // Setup axios mock to reject
    axios.get.mockRejectedValue(new Error('Network error'));

    // Call the function
    const result = await getArticles({});

    // Verify error handling
    expect(result).toEqual({ articles: [], totalCount: 0 });
  });

  test('getArticles combines search and pagination parameters', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        articles: [
          { id: 5, title: 'Advanced Test', slug: 'advanced-test' },
        ],
        totalCount: 1
      }
    };

    // Setup axios mock
    axios.get.mockResolvedValue(mockResponse);

    // Call the function with both search and pagination parameters
    const result = await getArticles({ page: 1, limit: 10, search: 'advanced' });

    // Verify axios was called with correct URL including all parameters
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('page=1')
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('limit=10')
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('search=advanced')
    );

    // Verify the returned data
    expect(result).toEqual(mockResponse.data);
    expect(result.articles.length).toBe(1);
    expect(result.totalCount).toBe(1);
  });
});