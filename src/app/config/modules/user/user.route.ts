import express, { NextFunction, Request, Response } from 'express';
import { UserControlers } from './user.controler';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidations } from '../students/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';



const router = express.Router();


router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControlers.createStudent
);

router.post(
  '/create-facalty',
  validateRequest(createFacultyValidationSchema),
  UserControlers.createFaculty
);

router.post('/create-admin', validateRequest(adminValidations.createAdminValidationSchema), UserControlers.createAdmin);




export const userRoutes = router;

