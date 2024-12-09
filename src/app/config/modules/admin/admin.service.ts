import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../erroes/AppError';
import httpStatus from 'http-status-codes';
import { User } from '../user/user.model';

const getAdminIntoDB = async (admin: TAdmin) => {
  const result = await Admin.find(admin);
  return result;
};

const getASingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const updateAAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...reaminingAdminData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...reaminingAdminData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAAdmnFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAdminIntoDB,
  getASingleAdminFromDB,
  updateAAdminFromDB,
  deleteAAdmnFromDB,
};
