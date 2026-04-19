import { Response } from 'express';
import { AuthRequest } from '@middleware/auth';
import UserService from '@services/UserService';
import { generateToken, comparePassword, hashPassword } from '@utils/auth';

/**
 * Auth Controller
 */
export class AuthController {
  /**
   * Register user
   */
  static async register(req: AuthRequest, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User already exists',
        });
      }

      // Create user
      const user = await UserService.createUser({
        name,
        email,
        password,
        phone,
      });

      // Generate token
      const token = generateToken(user.id, user.role);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Registration failed',
      });
    }
  }

  /**
   * Login user
   */
  static async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Generate token
      const token = generateToken(user.id, user.role);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.getUserById(req.userId!);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user',
      });
    }
  }

  /**
   * Update profile
   */
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { name, phone, avatar } = req.body;

      const user = await UserService.updateUserProfile(req.userId!, {
        name,
        phone,
        avatar,
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update profile',
      });
    }
  }

  /**
   * Logout user
   */
  static async logout(req: AuthRequest, res: Response) {
    try {
      // In a stateless JWT system, logout is handled on the client side
      // by removing the token. Here we can optionally implement token blacklisting.

      res.json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Logout failed',
      });
    }
  }

  /**
   * Forgot Password
   */
  static async forgotPassword(req: AuthRequest, res: Response) {
    try {
      const { email } = req.body;
      
      // In a real application, check if the user exists and generate a reset token.
      // We implement a mock behavior as requested.
      
      console.log(`[MOCK] Password reset requested for email: ${email}`);
      console.log(`[MOCK] Send Email: "Click here to reset your password..."`);
      
      res.json({
        success: true,
        message: 'If that email exists, a reset link has been sent.',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to process forgot password request',
      });
    }
  }
}

export default AuthController;
