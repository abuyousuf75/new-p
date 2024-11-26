import { StudentModel } from './../students/student.interface';
import config from "../..";
import { TStudent } from "../students/student.interface";
import {TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from '../students/student.model';


const createStudentIntoDB = async (password: string , studentData: TStudent) => {

   const userData : Partial<TUser> = {};

   userData.password = password || (config.default_password as string);


    // set strudent role
    
  userData.role = 'student';

    // crete a user
    const newUser = await User.create(userData)

    // set maulay id

   userData.id = '203010001';

  

  if(Object.keys(newUser).length){
    // set id , _id,
    studentData.id = newUser.id;
    studentData.user = newUser._id; // ref id

    const newStudent = await Student.create(studentData);
    return newStudent;

  }

};

export const UserService = { createStudentIntoDB 

};
