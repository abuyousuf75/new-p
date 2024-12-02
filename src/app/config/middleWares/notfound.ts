
import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
 res.status(httpStatus.NOT_FOUND).json({
    success : false,
    message : 'API not found',
    error:  ''
  });
};

export default notFound