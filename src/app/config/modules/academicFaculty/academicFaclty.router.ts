import express from 'express';
import { academicFacltyControlers } from './academicFacalty.controler';
import { academicFacailtyValidation } from './academicFacalty.validation';
import validateRequest from '../../middleWares/validateRequest';

const router = express.Router();

router.post('/create-academic-faclty', validateRequest(academicFacailtyValidation.createAcademicFacalityValidationSchema), academicFacltyControlers.createAcademicFaclty);

router.get('/',academicFacltyControlers.getAllAcademicFaclty)
router.get('/:facultyId', academicFacltyControlers.getSingleAcademicFaclty);
router.patch('/:facultyId', validateRequest(academicFacailtyValidation.updateAcademicFacalityValidationSchema), academicFacltyControlers.updateAcadmicFaclty);


export const AcademicFacaltyRoutes = router;