import httpStatus from 'http-status-codes';
import { StudentModel } from './../students/student.interface';
import config from '../..';
import { TStudent } from '../students/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../students/student.model';
import { TAcademicSemester } from '../academicSemester/accademic.semester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utiles';
import mongoose from 'mongoose';
import AppError from '../../erroes/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  // set strudent role

  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set genarted id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    // create a user (transaction-1)

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id,
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // ref id

    // create a user (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Unable to create student')
  }
};

export const UserService = { createStudentIntoDB };
