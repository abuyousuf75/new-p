import AppError from '../../erroes/AppError';
import { AcademicDepertment } from '../academicDepartment/academicDepertment.model';
import { AcademicFacality } from '../academicFaculty/academicFaculty.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistation } from '../semesterRegistration/semsesterRegistration.model';
import { TofferdCourse } from './offerdCourse.interface';
import httpStatus from 'http-status-codes';
import { OfferdCourse } from './offerdCourse.model';
import { Course } from '../course/course.model';
import { hasTimeConflict } from './offerdCourse.utiles';

const createOfferdCourseIntoDB = async (payload: TofferdCourse) => {
  const {
    semesterRegistation,
    academicFacaulty,
    academicDepartment,
    academicSemester,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists!
  const isSemesterRegistationExists = await SemesterRegistation.findById(
    semesterRegistation
  );

  if (!isSemesterRegistationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'semster regisation not found!');
  }

  const isacademicFacaultyExists = await AcademicFacality.findById(
    academicFacaulty
  );

  if (!isacademicFacaultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic facault not found!');
  }

  const isacademicDepartmentExists = await AcademicDepertment.findById(
    academicDepartment
  );

  if (!isacademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic department not found!');
  }

  const iscourseExists = await Course.findById(course);

  if (!iscourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'course  not found!');
  }

  const isfacultyExists = await Faculty.findById(faculty);

  if (!isfacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty  not found!');
  }

  const isacademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );

  if (!isacademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' AcademicSemester  not found!');
  }

  // check if the department is belonge to the facalty

  const isDepartmentBelongToFacalty = await AcademicDepertment.find({
    _id: academicDepartment,
    academicFacaulty,
  });

  if (!isDepartmentBelongToFacalty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isacademicDepartmentExists.name} is not belong to this ${isacademicFacaultyExists.name}`
    );
  }

  // chehck the if smae course and same section in rehgsiter course exisist

  const sameOfferCourse = await OfferdCourse.findOne({
    semesterRegistation,
    course,
    section,
  });

  if (sameOfferCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offerd course with same section is alredy exsist!`
    );
  }

  // get the scheduels of facalties

  const assignedSchedules = await OfferdCourse.find({
    semesterRegistation,
    faculty,
    days: { $in: days },
  }).select('days  startTime  endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `The faculty is not availabe at that time ! Choose other time or day`
    );
  }
  //crete offerd course here

  const result = await OfferdCourse.create({ ...payload, academicSemester });
  return result;
};

// get all course from db

const getAllCoursesFromDB = async () => {
  const result = await OfferdCourse.find();
  return result;
};

// get single course from db
const getSingleCoursesFromDB = async (id:string) => {
  const result = await OfferdCourse.findById(id);
   if (!OfferdCourse) {
     throw new AppError(404, 'Offered Course not found');
   }
  return result;
};

// update  course from db when status => UPCOMING

const updateOfferdCourseFromDB = async (
  id: string,
  payload: Pick<TofferdCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferdCourseExsist = await OfferdCourse.findById(id);
  if (!isOfferdCourseExsist) {
    throw new AppError(httpStatus.NOT_FOUND, `This Offerd course not exsist!`);
  }

  const isFacaltyExsist = await Faculty.findById(faculty);
  if (!isFacaltyExsist) {
    throw new AppError(httpStatus.NOT_FOUND, `This  facalty not exsist!`);
  }

  // ===================//

  const semesterRegistation = isOfferdCourseExsist.semesterRegistation;

  const semesterRegistionStatus = await SemesterRegistation.findById(
    semesterRegistation
  );

  if (semesterRegistionStatus?.status !=='UPCOMING') {
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `You can not update this offerd course as it is : ${
      semesterRegistionStatus?.status 
    }`
  );
  }

  const assignedSchedules = await OfferdCourse.find({
    semesterRegistation,
    faculty,
    days: { $in: days },
  }).select('days  startTime  endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `The faculty is not availabe at that time ! Choose other time or day`
    );
  }

  const result = await OfferdCourse.findByIdAndUpdate(id, payload , {
    new: true
  })

return result
};

export const OfferdCourseServices = {
  createOfferdCourseIntoDB,
  getAllCoursesFromDB,
  updateOfferdCourseFromDB,
  getSingleCoursesFromDB,
};
