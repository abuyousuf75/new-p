import httpStatus from 'http-status-codes';
import sendResponse from '../../uttiles/sendResponse';
import catchAsync from '../../uttiles/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester is created succesfully',
    data: result,
  });
});

// get all acaemic semester
const getAllAcademicSemester = catchAsync(async(req,res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester is revelted',
      data: result,
    });
});

// get A single acaemic semester

const getSingleAcademicSemester = catchAsync(async(req,res) => {
    const { semesterId } = req.params;
    const result = await  AcademicSemesterServices.getASingleAcademicSemesterFromDB(semesterId);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Academic Semester is revelted',
       data: result,
     });
})

// update A single acaemic semester
const updateAcademicSemester = catchAsync(async(req,res) => {
   const { semesterId } = req.params;
   const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
     semesterId,req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester updated Successfully',
        data: result,
      });
})

export const AcademicSemesterControlers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
