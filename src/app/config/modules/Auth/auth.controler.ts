import catchAsync from "../../uttiles/catchAsync";
import httpStatus from 'http-status-codes';
import sendResponse from "../../uttiles/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../..";

const loginUser = catchAsync(async(req,res) => {
  const result = await AuthServices.loginUser(req.body);

  const {refreshToken, accessToken, needsPasswordChange} = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly : true
  })

 sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'User successfully login',
   data: {
      accessToken, needsPasswordChange
   }
 });
});

const changePassword = catchAsync(async(req,res) => {

  const {...passwordData} = req.body;
  console.log(passwordData)
  const result = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: null,
  });
});

const refreshToken = catchAsync(async(req,res) => {
  const {refreshToken}
 = req.cookies;
   const result = await AuthServices.refreshToken(refreshToken);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Access token is retived successfully!',
  data: result,
});

})

export const AuthControlers = {
  loginUser,
  changePassword,
  refreshToken,
};