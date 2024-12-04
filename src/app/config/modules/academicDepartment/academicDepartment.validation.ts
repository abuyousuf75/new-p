import z from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Give academic Departmant name as string',
      required_error: ' Name is required',
    }),
    academicFaclties: z.string({
      invalid_type_error: 'Give academic Departmant name as string',
      required_error: 'AcademicDepartment Name is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Give academic Departmant name as string',
      required_error: ' Name is required',
    }).optional(),
    academicFaclties: z.string({
      invalid_type_error: 'Give academic Departmant name as string',
      required_error: 'AcademicDepartment Name is required',
    }).optional(),
  }).optional(),
});




export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema
};
