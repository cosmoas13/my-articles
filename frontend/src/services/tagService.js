import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

export const getTagById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tag by id:', error);
    return null;
  }
};

export const createTag = async (tagData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tags`, 
      tagData, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw new Error(error.response?.data?.message || 'Failed to create tag');
  }
};

export const createTags = async (tagNames, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tags/batch`, 
      { tags: tagNames }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating tags:', error);
    throw new Error(error.response?.data?.message || 'Failed to create tags');
  }
};

export const deleteTag = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/tags/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete tag');
  }
};