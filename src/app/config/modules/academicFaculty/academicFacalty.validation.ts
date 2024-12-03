import z from 'zod';

const createAcademicFacalityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Give academic facalty name as string',
    }),
  }),
});

const updateAcademicFacalityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Give academic facalty name as string',
    }),
  }),
});

export const academicFacailtyValidation = {
  createAcademicFacalityValidationSchema,
  updateAcademicFacalityValidationSchema,
};
