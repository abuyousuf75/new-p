
import httpStatus from 'http-status-codes';
import { UserService } from "./user.service";
import sendResponse from '../../uttiles/sendResponse';
import catchAsync from '../../uttiles/catchAsync';


const createStudent = catchAsync (async (req ,res) => {
    const {password , student: studentData } = req.body;
    const result = await UserService.createStudentInDB(password,studentData);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Student is created succesfully',
       data: result,
     });
});

const createFaculty = catchAsync (async (req ,res) => {
    const { password, faculty: facultyData } = req.body;
    const result = await UserService.createFacultyInDB(password,  facultyData);
    
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Faculty is created succesfully',
       data: result,
     });
});

const createAdmin = catchAsync(async (req,res) => {
   const { password, admin: adminData } = req.body;
   const result = await UserService.createAdminInDB(password,adminData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
})

export const UserControlers = {
  createStudent,
  createFaculty,
  createAdmin,
};

