
import { Response , Request} from 'express';
import { StudentServices } from './student.service';



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