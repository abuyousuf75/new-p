
import express from 'express';
import { AcademicSemesterControlers } from './academicSemester.controler';
import validateRequest from '../../middleWares/validateRequest';
import { AcademicSemesterValidation } from './academic.semester.Validation';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(AcademicSemesterValidation.createAcademicValidationSchema),
  AcademicSemesterControlers.createAcademicSemester
);

router.get('/',AcademicSemesterControlers.getAllAcademicSemester);

router.get('/:semesterId', AcademicSemesterControlers.getSingleAcademicSemester);

router.patch(
  '/:semesterId',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControlers.updateAcademicSemester
);


export const AcademicSemesterRoutes = router;