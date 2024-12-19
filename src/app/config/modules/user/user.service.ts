import httpStatus from 'http-status-codes';
import { TStudent } from '../students/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../students/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import config from '../..'; // Assuming the root configuration is being imported
import AppError from '../../erroes/AppError';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utiles';
import { TAcademicSemester } from '../academicSemester/accademic.semester.interface';
import { AcademicDepertment } from '../academicDepartment/academicDepertment.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudentInDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  
  userData.password = password || (config.default_password as string)
   userData.role = 'student'

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid admission semester ID');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Generate student ID
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    // Create user (Transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set IDs for payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference to the user object

    // Create student (Transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Unable to create student');
  }
};

const createFacultyInDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'faculty',
  };

  // Ensure the academic department exists
  const academicDepartment = await AcademicDepertment.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Generate Faculty ID
    userData.id = await generateFacultyId();
    console.log(userData.id);
    // Create user (Transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Assign IDs to payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference to the user object

    // Create faculty (Transaction-2)
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    session.endSession();

    return newFaculty[0];
  } catch (err: any) {
    await session.abortTransaction();

    session.endSession();
    console.log(err);
    throw new AppError(httpStatus.BAD_GATEWAY, 'Unable to create faculty');
  }
};

const createAdminInDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create mew user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err:any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
  }
};

export const UserService = {
  createStudentInDB,
  createFacultyInDB,
  createAdminInDB,
};
