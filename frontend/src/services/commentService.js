import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

export const deleteComment = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/comments/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete comment');
  }
};