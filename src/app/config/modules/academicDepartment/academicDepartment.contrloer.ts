import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import { AcademicDepertmentServices } from "./academicDepartment.service";
import httpStatus from 'http-status-codes';


const createAcademicDepartmant = catchAsync(async(req,res) => {

    const result = await AcademicDepertmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departmant is created succesfully',
    data: result,
  });

});


export const AcademicDepartmentControlers = {
  createAcademicDepartmant,
};