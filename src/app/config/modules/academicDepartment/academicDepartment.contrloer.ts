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

// get all 

const getAllAcademicDepartmet= catchAsync(async (req, res) => {
  const result = await AcademicDepertmentServices.getAllAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department  retrived successfully',
    data: result,
  });
});

// get single

const getSingleAcademicDepartment = catchAsync(async(req,res) => {
    const {departmentId} = req.params;
    const result = await AcademicDepertmentServices.getSingleAcademicDepartmentFromDB(departmentId);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Academic department  retrived successfully',
       data: result,
     });
})

// update 

const updateSingleAcademicDepartment = catchAsync(async(req,res) => {
   const { departmentId,payload } = req.params;
   const result = await AcademicDepertmentServices.updateSingleAcademicDepartmentFromDB(departmentId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department  updated successfully',
      data: result,
    });

})


export const AcademicDepartmentControlers = {
  createAcademicDepartmant,
  getAllAcademicDepartmet,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};