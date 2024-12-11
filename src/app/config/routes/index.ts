import express, { Router } from 'express'
import { StudentRoutes } from '../modules/students/student.route';
import { userRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

import { AcademicFacaltyRoutes } from '../modules/academicFaculty/academicFaclty.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { AdminRouters } from '../modules/admin/admin.route';
import { CourseRouter } from '../modules/course/course.router';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/admins',
    route: AdminRouters,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-facaltys',
    route: AcademicFacaltyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))






export default router;