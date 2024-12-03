import httpStatus from 'http-status-codes';
import { academicFacltyService } from './academicFaculty.service';
import catchAsync from '../../uttiles/catchAsync';
import sendResponse from '../../uttiles/sendResponse';

const createAcademicFaclty = catchAsync(async (req, res) => {
  const result = await academicFacltyService.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facalty is created succesfully',
    data: result,
  });
});

// all 

const getAllAcademicFaclty = catchAsync(async(req,res) => {
    const result = await academicFacltyService.getAllAcademicFacaltyFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Facalty retrived successfully',
      data: result,
    });
})

// single id
const getSingleAcademicFaclty = catchAsync(async(req,res) => {
      const { facultyId } = req.params;
    const result = await academicFacltyService.getASingleAcademicFacaltyFromDB(facultyId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Facalty retrived successfully',
      data: result,
    });
});

const updateAcadmicFaclty = catchAsync(async(req,res) => {
      const { facultyId } = req.params;
      const result = await academicFacltyService.updateAcadmicFacltyIntoDB(facultyId, req.body);
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'Academic Facalty updated successfully',
         data: result,
       });
})





export const academicFacltyControlers = {
  createAcademicFaclty,
  getAllAcademicFaclty,
  getSingleAcademicFaclty,
  updateAcadmicFaclty,
};
