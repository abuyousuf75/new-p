
import { TStudent } from "./student.interface";
import { Student} from "./student.model";

const createStudentIntoDB = async(studentData : TStudent) => {
  
 if (await Student.isUserExsist(studentData.id)) {
   throw new Error('User alredy exsist');
 }
 const result = await Student.create(studentData);

  // static method
  // const student = new Student(studentData) // crete an instance
  // if(await student.isUserExist(studentData.id)){
  //   throw new Error('User alredy exsist')
  // }

 
    




//  const result = await  student.save() // build in method


   return result
};

const getAllStudentsFromDB = async() => {
    const result = await Student.find();
    return result

}

const getsingleStudentFromDB = async (id : string) => {
    const result = await  Student.findOne({id})
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getsingleStudentFromDB,
};