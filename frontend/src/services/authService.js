import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(
        `${API_URL}/auth/logout`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    // Still clear tokens even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
    
    // Update tokens in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Clear tokens if refresh fails
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await axios.get(
      `${API_URL}/auth/profile`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Setup axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const { token } = await refreshToken();
        
        // Update the authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        
        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);