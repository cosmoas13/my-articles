const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { eq, and } = require('drizzle-orm');
const { db } = require('../db');
const { users, refreshTokens } = require('../db/schema');

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User data (email, password, name)
   * @returns {Promise<Object>} - Newly created user (without password)
   */
  async register(userData) {
    const { email, password, name } = userData;
    
    // Check if user already exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = await db.insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      });
    
    return newUser[0];
  }
  
  /**
   * Login a user
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise<Object>} - Tokens and user data
   */
  async login(credentials) {
    const { email, password } = credentials;
    
    // Find user by email
    const userResult = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (userResult.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    const user = userResult[0];
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(user);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
  
  /**
   * Generate access and refresh tokens
   * @param {Object} user - User object
   * @returns {Promise<Object>} - Access and refresh tokens
   */
  async generateTokens(user) {
    // Generate access token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.id, tokenType: 'refresh' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    
    // Calculate expiry date
    const expiryDate = new Date();
    // Parse the refresh token expiry (e.g., '7d' to 7 days)
    const expiryString = process.env.REFRESH_TOKEN_EXPIRY;
    const days = parseInt(expiryString.replace('d', ''));
    expiryDate.setDate(expiryDate.getDate() + days);
    
    // Store refresh token in database
    await db.insert(refreshTokens)
      .values({
        userId: user.id,
        token: refreshToken,
        expiresAt: expiryDate,
        createdAt: new Date(),
        revoked: false,
      });
    
    return { accessToken, refreshToken };
  }
  
  /**
   * Refresh access token using refresh token
   * @param {string} token - Refresh token
   * @returns {Promise<Object>} - New access and refresh tokens
   */
  async refreshToken(token) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      
      // Check if token exists and is not revoked
      const tokenResult = await db.select()
        .from(refreshTokens)
        .where(
          and(
            eq(refreshTokens.token, token),
            eq(refreshTokens.revoked, false)
          )
        )
        .limit(1);
      
      if (tokenResult.length === 0) {
        throw new Error('Invalid refresh token');
      }
      
      const tokenRecord = tokenResult[0];
      
      // Check if token is expired
      if (new Date() > new Date(tokenRecord.expiresAt)) {
        // Revoke expired token
        await db.update(refreshTokens)
          .set({ revoked: true })
          .where(eq(refreshTokens.id, tokenRecord.id));
          
        throw new Error('Refresh token expired');
      }
      
      // Get user
      const userResult = await db.select()
        .from(users)
        .where(eq(users.id, decoded.userId))
        .limit(1);
      
      if (userResult.length === 0) {
        throw new Error('User not found');
      }
      
      const user = userResult[0];
      
      // Revoke used refresh token
      await db.update(refreshTokens)
        .set({ revoked: true })
        .where(eq(refreshTokens.id, tokenRecord.id));
      
      // Generate new tokens
      const tokens = await this.generateTokens(user);
      
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        tokens,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  
  /**
   * Logout a user by revoking all refresh tokens
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async logout(userId) {
    await db.update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.userId, userId));
  }
}

module.exports = new AuthService();