
import { Response , Request} from 'express';
import { StudentServices } from './student.service';

import { z } from 'zod';
import { studentValidationSchemaZod } from './student.validation.zod';

const createStudent = async(req: Request, res: Response) => {
   
    try {
      const { student: studentData } = req.body;
      // const {error,value}= studentValidationSchema.validate(studentData);

      // creating a schema validation usnig zod

      const zodPassData = studentValidationSchemaZod.parse(studentData);

      const result = await StudentServices.createStudentIntoDB(zodPassData);
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

const getAllStudents = async(req: Request, res: Response) => {
    try{
        const result = await StudentServices.getAllStudentsFromDB()
         res.status(200).json({
           success: true,
           message: 'Students are retrived',
           data: result,
         });

    }
    catch (err){
            console.log(err)
    }
}

const getSingleStudent = async (req: Request, res : Response) => {
    try{
            const {studentId} = req.params;
            const result = await StudentServices.getsingleStudentFromDB(studentId)
            res.status(200).json({
              success: true,
              message: 'Students is retrived succesfully',
              data:result
            });
    }
    catch(err){
        console.log(err)
    }
}

export const StudentControlers = {
    createStudent, getAllStudents,
    getSingleStudent
}