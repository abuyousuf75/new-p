import { Types } from "mongoose";


export type TAcademicDepartment = {
    name : string;
    academicFaclties : Types.ObjectId;
}