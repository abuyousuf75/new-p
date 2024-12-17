import { z } from 'zod';
import { Days } from './offerdCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time formate , expated : "HH: MM in 24 hours format"',
  }
);

const createOfferdCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistation: z.string(),
      academicSemester: z.string(),
      academicFacaulty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM 00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'End time should be before start time',
        path: ['endTime'],
      }
    ),
});

const updateOfferdCourseValidationSchema = z.object({
  body: z.object({
    maxCapacity: z.number(),
    faculty: z.string(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema, // HH: MM 00-23: 00-59
    endTime: timeStringSchema,
  }),
});

export const OfferdCourseValidations = {
  createOfferdCourseValidationSchema,
  updateOfferdCourseValidationSchema,
};
