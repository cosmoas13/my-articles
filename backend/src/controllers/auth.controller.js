const authService = require('../services/auth.service');

class AuthController {
  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      // Register user
      const user = await authService.register({ email, password, name });
      
      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({ message: error.message });
      }
      
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }
  
  /**
   * Login a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      // Login user
      const result = await authService.login({ email, password });
      
      res.status(200).json({
        message: 'Login successful',
        ...result,
      });
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }
  
  /**
   * Refresh access token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
      
      // Refresh token
      const result = await authService.refreshToken(refreshToken);
      
      res.status(200).json({
        message: 'Token refreshed successfully',
        ...result,
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token', error: error.message });
    }
  }
  
  /**
   * Logout a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async logout(req, res) {
    try {
      const userId = req.user.userId;
      
      // Logout user
      await authService.logout(userId);
      
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  }
  
  /**
   * Get current user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfile(req, res) {
    try {
      res.status(200).json({
        user: {
          id: req.user.userId,
          email: req.user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get profile', error: error.message });
    }
  }
}

module.exports = new AuthController();