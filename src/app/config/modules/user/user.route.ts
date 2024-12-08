import express, { NextFunction, Request, Response } from 'express';
import { UserControlers } from './user.controler';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidations } from '../students/student.validation';



const router = express.Router();


router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControlers.createStudent
);




export const userRoutes = router;

