import express from 'express'
import { StudentControlers } from './student.controler';

const router = express.Router();

// will call controler function


router.get('/', StudentControlers.getAllStudents);

router.get('/:studentId', StudentControlers.getSingleStudent);
router.delete('/:studentId', StudentControlers.deleteAStudent);


export const StudentRoutes = router;