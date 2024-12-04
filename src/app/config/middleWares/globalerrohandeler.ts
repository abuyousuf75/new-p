
import { Request, Response, NextFunction } from 'express';

const globalErrorHandeler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went worng';
    res.status(statusCode).json({
      success: false,
      message,
      error: err,
    });
  }
};


export default globalErrorHandeler