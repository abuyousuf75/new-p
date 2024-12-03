import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepertment } from "./academicDepertment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
    const result = await AcademicDepertment.create(payload);
    return result;
}

export const AcademicDepertmentServices = {
    createAcademicDepartmentIntoDB,
    
}