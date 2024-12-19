
import express, { NextFunction, Request, Response } from 'express';
import { UserControlers } from './user.controler';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidations } from '../students/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';
import auth from '../../middleWares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();


router.post(
  '/create-student',
  auth(USER_ROLE?.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControlers.createStudent
);

router.post(
  '/create-facalty',
  auth(USER_ROLE?.admin),
  validateRequest(createFacultyValidationSchema),
  UserControlers.createFaculty
);

router.post(
  '/create-admin',
  auth(USER_ROLE?.admin),
  validateRequest(adminValidations.createAdminValidationSchema),
  UserControlers.createAdmin
);

export const userRoutes = router;
