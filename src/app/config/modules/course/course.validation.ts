import { z } from "zod";

const preRequisiteCourseValidationSchem = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    code: z.number(),
    prefix: z.string(),
    credits: z.number(),
    preRequiesiteCourses: z.array(preRequisiteCourseValidationSchem).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const UpdatepreRequisiteCourseValidationSchem = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.number().optional(),
    prefix: z.string().optional(),
    credits: z.number().optional(),
    preRequiesiteCourses: z
      .array(UpdatepreRequisiteCourseValidationSchem)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const UpdatefacaltiesValidationSchem = z.object({
  body: z.object({
    faculties:z.array(z.string())
  }),
});


export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  UpdatefacaltiesValidationSchem
};