import axiosInstance from '../utils/axios';

const AuthService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.name - User name
   * @returns {Promise<Object>} - Registration response
   */
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} - Login response with tokens
   */
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    
    // Store tokens in localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} - New access token
   */
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Logout a user
   * @returns {Promise<Object>} - Logout response
   */
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} - User profile
   */
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

export default AuthService;