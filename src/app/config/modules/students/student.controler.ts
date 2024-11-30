import { httpStatus } from 'http-status';

import { Response , Request, NextFunction, RequestHandler} from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../uttiles/sendResponse';

const catchAsync = (fn : RequestHandler) => {
  return (req:Request,res:Response,next:NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  
};


const getAllStudents = catchAsync(async(req, res, next) => {
      const result = await StudentServices.getAllStudentsFromDB();
      res.status(200).json({
        success: true,
        message: 'Students are retrived',
        data: result,
      });
})

const getSingleStudent =  catchAsync (async(req, res , next) => {
      const { studentId } = req.params;
      const result = await StudentServices.getsingleStudentFromDB(studentId);
      sendResponse(res, {
        statusCode: httpStatus.Ok,
        success: true,
        message: 'Student retrived successfully',
        data: result,
      });
})

const deleteAStudent = catchAsync (async(req, res, next) => {
     const student = req.params.studentId;
      const result = await StudentServices.deleteAStudentfromDB(student);
     res.status(200).json({
       success: true,
       message: 'Student deleted successfully',
       data:[],
     });
});

const updateAStudent = catchAsync (async(req , res , next) => {
    const {studentId} = req.params;
    const doc = req.body;
   const result = await StudentServices.updateAStdentFromDB(studentId,doc);
  res.status(200).json({
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