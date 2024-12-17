import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import httpStatus from 'http-status-codes';
import { OfferdCourseServices } from "./offerdCourse.service";

const createOfferdCourse = catchAsync(async(req,res) => {
    const result = await OfferdCourseServices.createOfferdCourseIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offerd Courses is created succesfully',
      data: result,
    });
});

// get all course

const getAllOfferdCourses = catchAsync(async(req,res) => {
  const result = await OfferdCourseServices.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offerd Courses retived successfully',
    data: result,
  });
});
// get asingle course
const getsingleOfferdCourses = catchAsync(async(req,res) => {
  const {id} = req.params
  const result = await OfferdCourseServices.getSingleCoursesFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offerd Courses retived successfully',
    data: result,
  });
});

// update course

const updateOfferdCourse = catchAsync(async(req,res) => {
   const id = req.params.id;
   const result = await OfferdCourseServices.updateOfferdCourseFromDB(id, req.body);
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Offerd Courses updated successfully',
     data: result,
   });
})

export const OfferdCourseControlers = {
  createOfferdCourse,
  getAllOfferdCourses,
  updateOfferdCourse,
  getsingleOfferdCourses,
};