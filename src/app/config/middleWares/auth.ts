import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../uttiles/catchAsync';
import AppError from '../erroes/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '..';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token send from client side
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    // check if the toke is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized token');
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorize hi');
        }

        //decoded undefind

        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
