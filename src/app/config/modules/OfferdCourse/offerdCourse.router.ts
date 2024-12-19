import express from 'express';
import { OfferdCourseControlers } from './offerdCourse.controler';
import validateRequest from '../../middleWares/validateRequest';
import { OfferdCourseValidations } from './offferdCourse.validation';
import auth from '../../middleWares/auth';


const router = express.Router();

router.get('/', OfferdCourseControlers.getAllOfferdCourses);
router.get('/:id', OfferdCourseControlers.getsingleOfferdCourses);

router.post(
  '/create-offerd-course',auth('admin'),
  validateRequest(OfferdCourseValidations.createOfferdCourseValidationSchema),
  OfferdCourseControlers.createOfferdCourse
);

router.patch('/:id', auth('admin'), validateRequest(OfferdCourseValidations.updateOfferdCourseValidationSchema), OfferdCourseControlers.updateOfferdCourse);


export const OfferdCourseRouter = router;
