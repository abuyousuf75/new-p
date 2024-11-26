
import { Student} from "./student.model";

const getAllStudentsFromDB = async() => {
    const result = await Student.find();
    return result

}

const getsingleStudentFromDB = async (id : string) => {
    const result = await  Student.findOne({id})
}

export const StudentServices = {
  getAllStudentsFromDB,
  getsingleStudentFromDB,
};