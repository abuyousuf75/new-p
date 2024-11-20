import Joi from "joi";

// Joi Schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Z][a-z]*$/, '{VALUE} must start with a capital letter'),
  middleName: Joi.string().allow(null, '').optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': '{VALUE} must contain only alphabets',
    }),
});

// Joi Schema for Guardian
const guardianValidatioSchema = Joi.object({
  fatherName: Joi.string().trim().max(20).required(),
  motherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
});

// Joi Schema for Local Guardian
const localguardianValidatioSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

// Joi Schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dateOfBirth: Joi.string().isoDate().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardint: guardianValidatioSchema.required(),
  localGuardiant: localguardianValidatioSchema.required(),
  profileImage: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'block').default('active'),
});

export default studentValidationSchema;