import express, { NextFunction, Request, Response } from 'express';
import { UserControlers } from './user.controler';
import validateRequest from '../../middleWares/validateRequest';
import createStudentValidationShema from '../students/student.validation';



const router = express.Router();


router.post(
  '/create-student',
  validateRequest(createStudentValidationShema),
  UserControlers.createStudent
);




export const userRoutes = router;

