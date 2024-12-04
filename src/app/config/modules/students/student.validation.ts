
import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be in capitalized format' }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name should only contain alphabetic characters',
    }),
});

// Guardian Schema
const guardiantValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, 'Father name is required')
    .max(20, 'Father name should not exceed 20 characters'),
  motherName: z.string().trim().min(1, 'Mother name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father contact number is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother contact number is required'),
  motherOccupation: z.string().trim().min(1, 'Mother occupation is required'),
});

// LocalGuardian Schema
const localguardiantValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required'),
  occupation: z.string().trim().min(1, 'Occupation is required'),
  contactNo: z.string().trim().min(1, 'Contact number is required'),
  address: z.string().trim().min(1, 'Address is required'),
});

// Main Student Schema
const createStudentValidationShema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Invalid gender value',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email format'),
      contactNo: z.string().trim().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().min(1, 'Present address is required'),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent address is required'),
      guardint: guardiantValidationSchema,
      localGuardiant: localguardiantValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export default createStudentValidationShema;
