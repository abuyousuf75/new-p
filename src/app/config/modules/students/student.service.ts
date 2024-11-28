import { StudentModel, TStudent } from './student.interface';

import mongoose from "mongoose";
import { Student} from "./student.model";

const getAllStudentsFromDB = async() => {
    const result = await Student.find();
    return result;

}

const getsingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ _id: studentId });
   const result = await Student.aggregate([
     {
       $match: { _id: new mongoose.Types.ObjectId(studentId) }
     },
   ]);

  return result;
};

const updateAStdentFromDB = async (studentId: string , updatedDoc = Student ) => {

  const result = await Student.findByIdAndUpdate(
    studentId,
    {$set:updatedDoc},
    {new:true}

  );
  return result
};

const deleteAStudentfromDB = async (studentId: string) => {
  const result = await Student.findByIdAndDelete(studentId);
  return result;
};



export const StudentServices = {
  getAllStudentsFromDB,
  getsingleStudentFromDB,
  deleteAStudentfromDB,
  updateAStdentFromDB,
};