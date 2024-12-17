import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import { SemesterRegistationService } from "./semesterRegistation.service";
import httpStatus from 'http-status-codes';

const createSemesterRegistastion = catchAsync(async (req,res) => {
    const result = await SemesterRegistationService.createSemesterRegistationIntoDB(req.body);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'AcademicSemester is created succesfully',
       data: result,
     });
});

const getAllAcademicSemesterRegistastion = catchAsync(async (req, res) => {
  const {params} = req.body;
  const result =
    await SemesterRegistationService.getAllAcademicSemesterIntoDB(params);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester is revelted',
    data: result,
  });
});

const getSingleAcademicSemesterRegistastion = catchAsync(async (req, res) => {
  const {id }= req.params
  const result =
    await SemesterRegistationService.getSingleAcademicSemsterFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester is revelted',
    data: result,
  });
});

const UpdateSingleAcademicSemesterRegistastion = catchAsync(async (req, res) => {
  const {id}= req.params;
  const result = 
    await SemesterRegistationService.UpdateSingleAcademicSemsterFromDB(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is updated Succcessfully',
    data: result,
  });
});



export const AcademicSemesterControlers = {
  createSemesterRegistastion,
  getAllAcademicSemesterRegistastion,
  getSingleAcademicSemesterRegistastion,
  UpdateSingleAcademicSemesterRegistastion,
};