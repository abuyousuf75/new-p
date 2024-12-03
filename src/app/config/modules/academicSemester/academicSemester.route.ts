
import express from 'express';
import { AcademicSemesterControlers } from './academicSemester.controler';
import validateRequest from '../../middleWares/validateRequest';
import { AcademicSemesterValidation } from './academic.semester.Validation';

const router = express.Router();

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidation.createAcademicValidationSchema),
AcademicSemesterControlers.createAcademicSemester);

router.get('/',AcademicSemesterControlers.getAllAcademicSemester);

router.get('/:semesterId', AcademicSemesterControlers.getSingleAcademicSemester);

router.patch('/:semesterId', validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControlers.updateAcademicSemester);


export const AcademicSemesterRoutes = router;