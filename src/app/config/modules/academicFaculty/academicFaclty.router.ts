import express from 'express';
import { academicFacltyControlers } from './academicFacalty.controler';
import { academicFacailtyValidation } from './academicFacalty.validation';
import validateRequest from '../../middleWares/validateRequest';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/create-academic-faclty',
  auth('admin'),
  validateRequest(
    academicFacailtyValidation.createAcademicFacalityValidationSchema
  ),
  academicFacltyControlers.createAcademicFaclty
);

router.get('/',academicFacltyControlers.getAllAcademicFaclty)
router.get('/:facultyId', academicFacltyControlers.getSingleAcademicFaclty);
router.patch(
  '/:facultyId',
  auth('admin'),
  validateRequest(
    academicFacailtyValidation.updateAcademicFacalityValidationSchema
  ),
  academicFacltyControlers.updateAcadmicFaclty
);


export const AcademicFacaltyRoutes = router;