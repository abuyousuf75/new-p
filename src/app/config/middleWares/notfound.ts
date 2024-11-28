
import status from 'http-status';
import { Request, Response, NextFunction } from 'express';

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(status.NOT_FOUND).json({
    success : false,
    message : 'API not found',
    error:  ''
  });
};

export default notFound