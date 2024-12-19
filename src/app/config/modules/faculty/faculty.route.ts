
import express from 'express';
import { FacaltyControlers } from './faculty.controler';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidations } from './faculty.validation';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacaltyControlers.getAllFacalty);

router.get('/:id', FacaltyControlers.getSingleFacalty);
router.patch('/:id', auth('admin'), validateRequest(studentValidations.updateFacultyValidationSchema), FacaltyControlers.updateSingleFacalty);

router.delete('/:id', auth('admin'), FacaltyControlers.deleteAFacalty)





export  const FacultyRouter = router;