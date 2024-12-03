import { StudentModel } from './../students/student.interface';
import config from "../..";
import { TStudent } from "../students/student.interface";
import {TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from '../students/student.model';
import { TAcademicSemester } from '../academicSemester/accademic.semester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utiles';


const createStudentIntoDB = async (password: string , payload: TStudent) => {

   const userData : Partial<TUser> = {};

   userData.password = password || (config.default_password as string);


    // set strudent role
    
  userData.role = 'student';

const admissionSemester = await AcademicSemester.findById(
  payload.admissionSemester
);



   userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  
 const newUser = await User.create(userData);

  if(Object.keys(newUser).length){
    // set id , _id,
    payload.id = newUser.id;
    payload.user = newUser._id; // ref id

    const newStudent = await Student.create(payload);
    return newStudent;

  }

};

export const UserService = { createStudentIntoDB 

};
