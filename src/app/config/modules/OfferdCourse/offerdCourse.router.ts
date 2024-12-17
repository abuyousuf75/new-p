import express from 'express';
import { OfferdCourseControlers } from './offerdCourse.controler';
import validateRequest from '../../middleWares/validateRequest';
import { OfferdCourseValidations } from './offferdCourse.validation';


const router = express.Router();

router.get('/', OfferdCourseControlers.getAllOfferdCourses);
router.get('/:id', OfferdCourseControlers.getsingleOfferdCourses);

router.post(
  '/create-offerd-course',
  validateRequest(OfferdCourseValidations.createOfferdCourseValidationSchema),
  OfferdCourseControlers.createOfferdCourse
);

router.patch('/:id', validateRequest(OfferdCourseValidations.updateOfferdCourseValidationSchema), OfferdCourseControlers.updateOfferdCourse);


export const OfferdCourseRouter = router;
