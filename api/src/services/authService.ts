import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { User, UserResponse } from '../models/user';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly SALT_ROUNDS = 10;

  static async registerUser(username: string, email: string, password: string): Promise<UserResponse> {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Insert new user
    const query = `
      INSERT INTO users (username, email, password, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, username, email, created_at as "createdAt"
    `;

    const result = await pool.query(query, [username, email, hashedPassword]);
    return result.rows[0];
  }

  static async loginUser(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (excluding password) and token
    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at
    };

    return { user: userResponse, token };
  }

  static verifyToken(token: string): { userId: number; email: string } {
    try {
      return jwt.verify(token, this.JWT_SECRET) as { userId: number; email: string };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
