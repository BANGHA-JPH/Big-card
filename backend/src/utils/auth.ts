import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { config } from '@config/index';

/**
 * Generate a UUID v4
 */
export const generateId = (): string => {
  return randomUUID();
};


/**
 * Generate JWT token
 */
export const generateToken = (userId: string, role: string = 'user'): string => {
  return jwt.sign(
    {
      userId,
      role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiry,
    }
  );
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwt.secret);
};

/**
 * Hash password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Generate random token for password reset
 */
export const generateResetToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  generateResetToken,
};
