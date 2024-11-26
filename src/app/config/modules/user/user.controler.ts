import { Request, Response } from "express";
import { StudentServices } from "../students/student.service";
import { studentValidationSchemaZod } from "../students/student.validation.zod";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {password , student: studentData } = req.body;
   
    // const zodPassData = studentValidationSchemaZod.parse(studentData);

    const result = await UserService.createStudentIntoDB(password,studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successflly',
      data: result,
    });

    // console.log({error},{value})
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserControlers = {
  createStudent,
};

