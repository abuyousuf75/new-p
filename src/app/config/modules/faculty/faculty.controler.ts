import httpStatus from 'http-status-codes'
import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import { FacaltyService } from './faculty.service';


const getAllFacalty = catchAsync(async (req, res) => {

  const result = await FacaltyService.getAllFacaltysFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facalty is  retrived successfully',
    data: result,
  });
});


const getSingleFacalty = catchAsync(async(req,res) => {
    const id = req.params.id;
      const result = await FacaltyService.getSingleFacaltyFromDB(id);
     
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facalty is  retrived successfully',
    data: result,
  });
})

const updateSingleFacalty = catchAsync(async(req,res) => {
    const id = req.params.id;
    const { faculty } = req.body;
    const result = await FacaltyService.updateAFacaltyFromDB(id, faculty);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Facalty updated successfully',
       data: result,
     });
})

const deleteAFacalty = catchAsync(async(req,res) => {
  const faculty = req.params.id;
  const result = await FacaltyService.deleteAFacaltyFromDB(faculty)
 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'Facalty successfully deleted',
   data: result,
 });
})



export const FacaltyControlers = {
  getAllFacalty,
  getSingleFacalty,
  updateSingleFacalty,
  deleteAFacalty,
};