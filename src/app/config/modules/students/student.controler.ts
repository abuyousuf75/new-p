import httpStatus from 'http-status-codes';
import { StudentServices } from './student.service';
import sendResponse from '../../uttiles/sendResponse';
import catchAsync from '../../uttiles/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Student is  retrived successfully',
     data: result,
   });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const {studentId}= req.params
  console.log(studentId)
  const result = await StudentServices.getsingleStudentFromDB(studentId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived successfully',
    data: result,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  const student = req.params.id;
  const result = await StudentServices.deleteAStudentfromDB(student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateAStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateAStdentFromDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

export const StudentControlers = {
  getAllStudents,
  getSingleStudent,
  deleteAStudent,
  updateAStudent,
};
