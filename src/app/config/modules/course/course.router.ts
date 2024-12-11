import express from 'express';
import { CourseControlers } from './course.controler';
import validateRequest from '../../middleWares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post('/', validateRequest(CourseValidations.createCourseValidationSchema), CourseControlers.createCourse);
router.get('/', CourseControlers.getAllCourse);
router.get('/:id', CourseControlers.getSingleCourse);
router.delete('/:id',CourseControlers.deleteCourse);
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControlers.updateCourse);
router.put('/:courseId/assign-faculties',validateRequest(CourseValidations.UpdatefacaltiesValidationSchem), CourseControlers.assignFacaultiesWithCourse)
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidations.UpdatefacaltiesValidationSchem), CourseControlers.removeFacaultiesWithCourse)

export const CourseRouter = router;