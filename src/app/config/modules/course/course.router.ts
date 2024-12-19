import express from 'express';
import { CourseControlers } from './course.controler';
import validateRequest from '../../middleWares/validateRequest';
import { CourseValidations } from './course.validation';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post('/', auth('admin'),validateRequest(CourseValidations.createCourseValidationSchema), CourseControlers.createCourse);

router.get('/', CourseControlers.getAllCourse);

router.get('/:id', CourseControlers.getSingleCourse);

router.delete('/:id', auth('admin'), CourseControlers.deleteCourse);

router.patch('/:id', auth('admin'),validateRequest(CourseValidations.updateCourseValidationSchema), CourseControlers.updateCourse);

router.put('/:courseId/assign-faculties', auth('admin'),validateRequest(CourseValidations.UpdatefacaltiesValidationSchem), CourseControlers.assignFacaultiesWithCourse);

router.delete('/:courseId/remove-faculties', auth('admin'),validateRequest(CourseValidations.UpdatefacaltiesValidationSchem), CourseControlers.removeFacaultiesWithCourse)

export const CourseRouter = router;