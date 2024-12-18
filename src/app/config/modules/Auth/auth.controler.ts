import catchAsync from "../../uttiles/catchAsync";
import httpStatus from 'http-status-codes';
import sendResponse from "../../uttiles/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req,res) => {
  const result = await AuthServices.loginUser(req.body)
 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'User successfully added',
   data: result,
 });
});

const changePassword = catchAsync(async(req,res) => {

  const {...passwordData} = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: null,
  });
});

export const AuthControlers = {
  loginUser,
  changePassword,
};