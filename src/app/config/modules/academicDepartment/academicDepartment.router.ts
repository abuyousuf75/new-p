import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControlers } from './academicDepartment.contrloer';

const router = express.Router();

router.post('/create-academic-department', validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControlers.createAcademicDepartmant);

router.get('/', AcademicDepartmentControlers.getAllAcademicDepartmet);

router.get('/:departmentId', AcademicDepartmentControlers.getSingleAcademicDepartment);

router.patch('/:departmentId', validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControlers.updateSingleAcademicDepartment);


export const AcademicDepartmentRoutes = router;


