import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../uttiles/catchAsync';
import AppError from '../erroes/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '..';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token send from client side
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    // check if the toke is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exsist

    const user = await User.isUserExsistByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
    }

    // check if user alredy deleted
    // isDeleted

    const isUserDeletd = user?.isDeleted;

    if (isUserDeletd) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is deletd!');
    }

    // check if user status blocked
    //isDeleted

    const isUserBlocked = user.status;

    if (isUserBlocked === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
    

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorize hi!');
    }

    //decoded undefind

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
