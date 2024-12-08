import { studentValidations } from './student.validation';
import express from 'express'
import { StudentControlers } from './student.controler';
import validateRequest from '../../middleWares/validateRequest';

const router = express.Router();

// will call controler function


router.get('/', StudentControlers.getAllStudents);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControlers.updateAStudent
);

router.get('/:studentId', StudentControlers.getSingleStudent);
router.delete('/:studentId', StudentControlers.deleteAStudent);



export const StudentRoutes = router;