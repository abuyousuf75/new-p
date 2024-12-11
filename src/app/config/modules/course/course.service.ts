import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import QueryBuilders from '../../builder/QueryBilder';
import { TCourse, TCourseFacalties } from './corse.interface';
import { CourseSerchabbleFileds } from './course.constant';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../erroes/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(
    Course.find().populate('preRequiesiteCourses.course'),
    query
  )
    .search(CourseSerchabbleFileds)
    .filter()
    .paginate()
    .fields()
    .sort();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequiesiteCourses.course'
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequiesiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //step1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    // check if there is any pre requisite courses to update
    if (preRequiesiteCourses && preRequiesiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequiesiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }

      // filter out the new course fields
      const newPreRequisites = preRequiesiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequiesiteCourses.course'
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const assignFacaltiesWithCourseIntoDB = async (
  id: string,
  paylaod: Partial<TCourseFacalties>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: paylaod } },
    },

    {
      upsert: true,
      new: true,
    }
  );
 
  return result;
};

const removeFacaltiesFromDB = async (
  id: string,
  paylaod: Partial<TCourseFacalties>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties : {$in:paylaod} },
    },

    {
      new: true,
    }
  );
 
  return result;
};



export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  deleteCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  assignFacaltiesWithCourseIntoDB,
  removeFacaltiesFromDB,
};
