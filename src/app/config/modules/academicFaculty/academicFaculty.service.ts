import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacality } from "./academicFaculty.model";


const createAcademicFacultyIntoDB =async (payload:TAcademicFaculty) => {
    const result = await AcademicFacality.create(payload);
    return result
}

const getAllAcademicFacaltyFromDB = async() => {
    const result = await AcademicFacality.find();
    return result
}

const getASingleAcademicFacaltyFromDB = async (facultyId: string) => {
  const result = await AcademicFacality.findOne({_id: facultyId});
  return result;
};

const updateAcadmicFacltyIntoDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFacality.findByIdAndUpdate(
    { _id: facultyId },
    payload,
    { new: true }
  );
  return result;
};

export const academicFacltyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacaltyFromDB,
  getASingleAcademicFacaltyFromDB,
  updateAcadmicFacltyIntoDB,
};