import { TStudent } from './student.interface';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../erroes/AppError';
import { User } from '../user/user.model';
import QueryBuilders from '../../builder/QueryBilder';
import { query } from 'express';
import studentSerchableFileds from './student.constant';

 const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  console.log('base qurey', query);

  const queryObj = { ...query }; //copy

  let searchTerm = '';
  // const studentSerchableFileds = ['email', 'name.firstName', 'presentAddress'];

//   // if (query?.searchTerm) {
//   //   searchTerm = query.searchTerm as string;
//   // }

//   // const serchQuery = Student.find({
//   //   $or: studentSerchableFileds.map((field) => ({
//   //     [field]: { $regex: searchTerm, $options: 'i' },
//   //   })),
//   // });

//   // // filtering

//   // const excludeFileds = ['searchTerm', 'sort', 'limit', 'page', 'fileds'];

//   // excludeFileds.forEach((el) => delete queryObj[el]);

//   // const filterQuery = serchQuery
//   //   .find(queryObj)
//   //   .populate('admissionSemester')
//   //   .populate({
//   //     path: 'academicDepartment',
//   //     populate: {
//   //       path: 'academicFaclties',
//   //     },
//   //   });

// //   let sort = '-createdAt';

// //   if (query?.sort) {
// //     sort = query.sort as string;
// //   }

// //   const sortQuery = filterQuery.sort(sort);

// //   let page = 1;
// //   let skip = 0;
// //   let limit = 1;
// //    if (query?.limit) {
// //      limit = query.limit as number;
// //    }

//   // if(query?.page){
//   //   page = query.page as number;
//   //   skip = (page-1)*limit
//   }

// // const paginateQuery = sortQuery.skip(skip);


 
// //   const limitQuery = paginateQuery.limit(limit);

// //   let fileds = '-__v';

// //   if (query?.fileds) {
// //     fileds = (query.fileds as string).split(',').join(' ');
   
// //   }

// //   const filedQuery =await limitQuery.select(fileds)

// //   return filedQuery;

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
