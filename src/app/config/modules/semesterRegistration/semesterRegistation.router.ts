import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { SemesterRegisttaionValidations } from './semesterRegistation.validation';
import { AcademicSemesterControlers } from './semesterRegistaion.controler';

const router = express.Router();

router.post(
  '/create-semester-registration',
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