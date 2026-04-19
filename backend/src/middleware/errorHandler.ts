import { Request, Response, NextFunction } from 'express';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidatedRequest extends Request {
  validated?: any;
}

/**
 * Validation error middleware
 */
export const validationErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError' || err.isJoi) {
    const errors: ValidationError[] = [];

    if (err.details) {
      err.details.forEach((detail: any) => {
        errors.push({
          field: detail.path.join('.'),
          message: detail.message.replace(/"/g, ''),
        });
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }

  next(err);
};

/**
 * Error handler middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
};

export default {
  validationErrorHandler,
  errorHandler,
  notFoundHandler,
};
