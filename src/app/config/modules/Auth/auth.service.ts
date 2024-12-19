import config from '../..';
import AppError from '../../erroes/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status-codes';

import jwt, { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exsist

  const user = await User.isUserExsistByCustomId(payload?.id);

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

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !');
  }

 

  // Access Granted: Send Access token and referesh token

  // crete token send to user
  const jwtPayload = {
    userId: user.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

// change password

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  // checking if the user is exsist

  const user = await User.isUserExsistByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found !');
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

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');


   

  /// hased new password

  const newHasedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycript_salt_round)
  );

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHasedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};