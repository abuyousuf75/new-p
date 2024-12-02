
import httpStatus from 'http-status-codes';
import { UserService } from "./user.service";
import sendResponse from '../../uttiles/sendResponse';
import catchAsync from '../../uttiles/catchAsync';


const createStudent = catchAsync (async (req ,res) => {
    const {password , student: studentData } = req.body;
    const result = await UserService.createStudentIntoDB(password,studentData);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Student is created succesfully',
       data: result,
     });
});

export const UserControlers = {
  createStudent,
};

