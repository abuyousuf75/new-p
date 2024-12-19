import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControlers } from './academicDepartment.contrloer';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth('admin'),
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControlers.createAcademicDepartmant
);
router.get('/', AcademicDepartmentControlers.getAllAcademicDepartmet);

router.get('/:departmentId', AcademicDepartmentControlers.getSingleAcademicDepartment);

router.patch(
  '/:departmentId',
  auth('admin'),
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControlers.updateSingleAcademicDepartment
);


export const AcademicDepartmentRoutes = router;


