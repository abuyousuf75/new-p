
import express from 'express';
import { FacaltyControlers } from './faculty.controler';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidations } from './faculty.validation';

const router = express.Router();

router.get('/', FacaltyControlers.getAllFacalty);
router.get('/:id', FacaltyControlers.getSingleFacalty);
router.patch('/:id', validateRequest(studentValidations.updateFacultyValidationSchema), FacaltyControlers.updateSingleFacalty);

router.delete('/:id', FacaltyControlers.deleteAFacalty)





export  const FacultyRouter = router;