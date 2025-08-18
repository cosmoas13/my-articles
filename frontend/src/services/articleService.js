import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getArticles = async ({ page = 1, limit = 10, search = '' }) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('limit', limit);

    if (search) {
      queryParams.append('search', search);
    }

    const response = await axios.get(`${API_URL}/articles?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], totalCount: 0 };
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/articles/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
};

export const getArticleComments = async (articleId) => {
  try {
    const response = await axios.get(`${API_URL}/comments/article/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article comments:', error);
    return [];
  }
};

export const submitComment = async (comment) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, comment);
    return response.data;
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit comment');
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles?page=1&limit=3`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};

export const getSimilarPosts = async (categories, slug) => {
  try {
    // Karena tidak ada endpoint /articles/related, gunakan endpoint /articles dengan filter kategori
    if (!categories || categories.length === 0) {
      return [];
    }
    
    const categoryIds = categories.map(category => category.id).join(',');
    const response = await axios.get(`${API_URL}/articles?limit=3&categoryId=${categoryIds}`);
    
    // Filter out the current article by slug
    const filteredArticles = response.data.articles.filter(article => article.slug !== slug);
    return filteredArticles.slice(0, 3); // Limit to 3 articles
  } catch (error) {
    console.error('Error fetching similar posts:', error);
    return [];
  }
};