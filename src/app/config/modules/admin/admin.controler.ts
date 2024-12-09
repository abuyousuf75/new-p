import { Admin } from './admin.model';
import catchAsync from "../../uttiles/catchAsync";
import sendResponse from "../../uttiles/sendResponse";
import { AdminServices } from "./admin.service";
import httpStatus from 'http-status-codes';

const getAllAdmin = catchAsync(async(req,res) => {
    const result = await AdminServices.getAdminIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is  retrived successfully',
      data: result,
    });
})

const getAAdmin = catchAsync(async(req,res) => {
    const id = req.params.id;
    const result =await AdminServices.getASingleAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is  retrived successfully',
      data: result,
    });
})

const updateAAdmin = catchAsync(async(req,res) => {
     const id = req.params.id;
     const {admin} = req.body;
      const result = await AdminServices.updateAAdminFromDB(id,admin);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is  retrived successfully',
        data: result,
      });
})

const deleteAdmin = catchAsync(async (req,res) => {
    const admin = req.params.id;
    const result = await AdminServices.deleteAAdmnFromDB(admin);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin successfully deleted',
      data: result,
    });
})

export const AdminControlers = {
  getAllAdmin,
  getAAdmin,
  updateAAdmin,
  deleteAdmin,
};