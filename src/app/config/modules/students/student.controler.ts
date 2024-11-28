import { httpStatus } from 'http-status';

import { Response , Request, NextFunction} from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../uttiles/sendResponse';



const getAllStudents = async(req: Request, res: Response, next:NextFunction) => {
    try {
      const result = await StudentServices.getAllStudentsFromDB();
      res.status(200).json({
        success: true,
        message: 'Students are retrived',
        data: result,
      });
    } 
    catch (err) {
      next(err);
    }
}

const getSingleStudent = async (req: Request, res : Response, next:NextFunction) => {
    try{
      const { studentId } = req.params;
      const result = await StudentServices.getsingleStudentFromDB(studentId);
      res.status(200).json({
        success: true,
        message: 'Student retrived successfully',
        data: result,
      });
      // sendResponse(res, {
      //   statusCode: httpStatus.Ok,
      //   success: true,
      //   message: 'Student retrived successfully',
      //   data: result,
      // });
    }
    catch(err){
        next(err)
    }
}

const deleteAStudent = async(req:Request, res: Response, next : NextFunction) => {
   try{
     const student = req.params.studentId;
    const result = await StudentServices.deleteAStudentfromDB(student);
     res.status(200).json({
       success: true,
       message: 'Student deleted successfully',
       data:[],
     });
   }

   catch(err){
      next(err)
   }

}

const updateAStudent = async(req: Request , res: Response , next : NextFunction) => {

  try{
    const {studentId} = req.params;
  const doc = req.body;
  const result = await StudentServices.updateAStdentFromDB(studentId,doc);

  res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: result,
      });
  }

  catch(err){
    next(err)
  }


}


export const StudentControlers = {
  getAllStudents,
  getSingleStudent,
  deleteAStudent,
  updateAStudent,
};