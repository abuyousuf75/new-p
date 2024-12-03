

import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester } from "./accademic.semester.interface";

const createAcademicSemesterIntoDB = async (payload : TAcademicSemester) => {

// semester name -> semester code

if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error('Invaild Semester Code')
}

const result = await AcademicSemester.create(payload);
return result;

}

//  get all academic semsters

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

//  get single academic semsters

const getASingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

// update a single semester

const updateAcademicSemesterFromDB = async(id: string, 
  payload: Partial<TAcademicSemester>,
) => {
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.name){
        throw new Error('Invalid semesster code!')
    };
    const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,
     { new:true});
     return result
};


export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getASingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};