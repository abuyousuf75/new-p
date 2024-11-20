import express from 'express'
import { StudentControlers } from './student.controler';

const router = express.Router();

// will call controler function

router.post('/create-student', StudentControlers.createStudent);

router.get('/', StudentControlers.getAllStudents)

router.get('/:studentId', StudentControlers.getSingleStudent)

export const StudentRoutes = router;