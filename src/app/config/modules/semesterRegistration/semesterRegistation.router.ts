import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { SemesterRegisttaionValidations } from './semesterRegistation.validation';
import { AcademicSemesterControlers } from './semesterRegistaion.controler';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth('admin'),
  validateRequest(
    SemesterRegisttaionValidations.createSemesterRegistationValidationSchema
  ),
  AcademicSemesterControlers.createSemesterRegistastion
);

router.get('/', AcademicSemesterControlers.getAllAcademicSemesterRegistastion);

router.get('/:id', AcademicSemesterControlers.getSingleAcademicSemesterRegistastion);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegisttaionValidations.upadteSemesterRegistationValidationSchema
  ),
  AcademicSemesterControlers.UpdateSingleAcademicSemesterRegistastion
);





export const SemesterRegistationRouter = router;