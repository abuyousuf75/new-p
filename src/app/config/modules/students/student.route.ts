import express from 'express'
import { StudentControlers } from './student.controler';

const router = express.Router();

// will call controler function


router.get('/', StudentControlers.getAllStudents)

router.get('/:studentId', StudentControlers.getSingleStudent)

export const StudentRoutes = router;