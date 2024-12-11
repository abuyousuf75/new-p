import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import httpStatus from 'http-status-codes';
import { CourseServices } from "./course.service";



const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created succesfully',
    data: result,
  });
});

// all

const getAllCourse = catchAsync(async (req, res) => {

  const result = await CourseServices.getAllCourseFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrived successfully',
    data: result,
  });
});

// single id
const getSingleCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrived successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Deleted successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async(req,res) => {
  const {id} = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Course updated successfully',
     data: result,
   });
})

const assignFacaultiesWithCourse = catchAsync(async (req,res) => {

  const { courseId } = req.params;
   const { faculties } = req.body;
  const result = await CourseServices.assignFacaltiesWithCourseIntoDB(
    courseId,
    faculties
  );
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'facaulties assigned succesfully',
     data: result,
   });
  
})


const removeFacaultiesWithCourse = catchAsync(async (req,res) => {

  const { courseId } = req.params;
   const { faculties } = req.body;
  const result = await CourseServices.removeFacaltiesFromDB(
    courseId,
    faculties
  );
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'facaulties removed succesfully',
     data: result,
   });
  
})




export const CourseControlers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacaultiesWithCourse,
  removeFacaultiesWithCourse,
};
