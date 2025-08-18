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
    // Backend mengembalikan token dalam format tokens.accessToken
    if (response.data.tokens && response.data.tokens.accessToken) {
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      console.log('Access token saved:', response.data.tokens.accessToken.substring(0, 10) + '...');
    } else {
      console.error('No access token received from server', response.data);
    }
    
    if (response.data.tokens && response.data.tokens.refreshToken) {
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      console.log('Refresh token saved');
    } else {
      console.error('No refresh token received from server', response.data);
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
    
    if (response.data.tokens && response.data.tokens.accessToken) {
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
    } else {
      console.error('No access token received from server during refresh', response.data);
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