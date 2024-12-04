import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepertment } from "./academicDepertment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
   
    const result = await AcademicDepertment.create(payload);
    return result;
}

const getAllAcademicDepartmentFromDB = async () => {
    const result = await AcademicDepertment.find().populate('academicFaclties');
    return result;
}

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
    const result = await AcademicDepertment.findOne({_id: departmentId}).populate('academicFaclties');
    return result;
}

const updateSingleAcademicDepartmentFromDB = async (departmentId: string, payload: Partial<TAcademicDepartment> ) => {
    const result = await AcademicDepertment.findOneAndUpdate(
        {_id: departmentId},
        payload,
        {new:true}
    );
    
    return result;
};

export const AcademicDepertmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
};