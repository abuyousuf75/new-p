import { TStudent } from './student.interface';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../erroes/AppError';
import { User } from '../user/user.model';
import QueryBuilders from '../../builder/QueryBilder';

import studentSerchableFileds from './student.constant';

 const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
 

const studetQuery = new QueryBuilders(
  Student.find()
  
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaclties',
        },
      }),
  query
)
  .search(studentSerchableFileds)
  .filter()
  .sort()
  .paginate()
  .fields();

const result = await studetQuery.modelQuery;
return result;


};

const getsingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaclties',
      },
    });

  return result;
};

const updateAStdentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardint, localGuardiant, ...remaningStudentData } = payload;


  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardint && Object.keys(guardint).length) {
    for (const [key, value] of Object.entries(guardint)) {
      modifiedUpdatedData[`guardint.${key}`] = value;
    }
  }
  if (localGuardiant && Object.keys(localGuardiant).length) {
    for (const [key, value] of Object.entries(localGuardiant)) {
      modifiedUpdatedData[`localGuardiant.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAStudentfromDB = async (id: string) => {
  const session = await mongoose.startSession();

  // validation if user exsist

  const isStudentExsist = await Student.findOne({ id });
  if (!isStudentExsist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exsist ');
  }

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Unable to create student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getsingleStudentFromDB,
  deleteAStudentfromDB,
  updateAStdentFromDB,
};
