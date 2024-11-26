import config from "../..";
import { TStudent } from "../students/student.interface";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password: string , studentData: TStudent) => {

   const userData : Partial<TUser> = {};

   userData.password = password || (config.default_password as string);


    // set strudent role
    
  userData.role = 'student';

    // crete a user

    // set maulay id

   userData.id = '203010001';

  const result = await User.create(userData);

  if(Object.keys(result).length){
    // set id , _id,
    studentData.id = result.id;
    studentData.user = result._id;

  }

  return result;
};

export const UserService = { createStudentIntoDB 

};
