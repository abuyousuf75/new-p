
import status from 'http-status';
import { RequestHandler } from "express";
import { StudentServices } from "../students/student.service";
import { studentValidationSchemaZod } from "../students/student.validation.zod";
import { UserService } from "./user.service";
import sendResponse from '../../uttiles/sendResponse';


const createStudent: RequestHandler = async (req , res, next ) => {
  try {
    const {password , student: studentData } = req.body;
   
  

    const result = await UserService.createStudentIntoDB(password,studentData);
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successflly',
    //   data: result,
    // });

     sendResponse(res, {
       statusCode: status.OK,
       success: true,
       message: 'Student is created succesfully',
       data: result,
     });

    // console.log({error},{value})
  } catch (err) {
    next(err)
  }
};

export const UserControlers = {
  createStudent,
};

