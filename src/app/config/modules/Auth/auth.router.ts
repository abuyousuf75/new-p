
import  express  from "express";
import validateRequest from "../../middleWares/validateRequest";
import { AuthValidation } from "./authValidation";
import { AuthControlers } from "./auth.controler";
import auth from "../../middleWares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControlers.loginUser);

router.post('/change-password',
    auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.student), validateRequest(AuthValidation.changePasswordValidationSchema), AuthControlers.changePassword);


    router.post(
      '/refresh-Token',
      validateRequest(AuthValidation.refreshTokenValidationSchema),
      AuthControlers.refreshToken
    );



export const AuthValidationRoute = router;