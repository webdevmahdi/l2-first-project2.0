import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const formatted = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== formatted) {
        return helpers.error('any.invalid', { message: 'First name must be capitalized.' });
      }
      return value;
    })
    .messages({
      'string.empty': 'First name is required! Please provide the student’s first name.',
      'string.max': 'First name can not be more than 20 characters.',
      'any.invalid': '{#message}',
    }),
  middleName: Joi.string().trim().allow('', null),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last name is required! Please provide the student’s last name.',
      'string.pattern.base': '{#value} is not valid!',
    }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fathersName: Joi.string().trim().required().messages({
    'string.empty': "Father's name is required! Please provide the father's name.",
  }),
  fathersOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's occupation is required! Please specify the father's job.",
  }),
  fathersContactNo: Joi.string().trim().required().messages({
    'string.empty': "Father's contact number is required! Please provide a valid phone number.",
  }),
  mothersName: Joi.string().trim().required().messages({
    'string.empty': "Mother's name is required! Please provide the mother's name.",
  }),
  mothersOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's occupation is required! Please specify the mother's job.",
  }),
  mothersContactNo: Joi.string().trim().required().messages({
    'string.empty': "Mother's contact number is required! Please provide a valid phone number.",
  }),
});

// Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian name is required! Please provide their full name.',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian occupation is required!',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian contact number is required!',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian address is required!',
  }),
});

// ---- Main Student Schema ----
const createStudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required!',
  }),

  name: userNameSchema.required().messages({
    'any.required': 'Student name information is required!',
  }),

  gender: Joi.string()
    .valid('Male', 'Female')
    .required()
    .messages({
      'any.only': 'Gender must be either Male or Female!',
      'string.empty': 'Gender is required! Please select Male or Female.',
    }),

  dateOfBirth: Joi.string().optional(),

  contactNo: Joi.string().required().messages({
    'string.empty': 'Primary contact number is required! Please provide a valid number.',
  }),

  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required!',
  }),

  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not valid!',
    'string.empty': 'Email address is required! Please provide a valid email.',
  }),

  bloodGroup: Joi.string()
    .valid('A+', 'B+', 'A-', 'B-', 'AB-', 'AB+', 'O+', 'O-')
    .messages({
      'any.only':
        'Invalid blood group! Must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.',
    }),

  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required! Please provide a current address.',
  }),

  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required! Please provide a permanent address.',
  }),

  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian details are required! Please include parent information.',
  }),

  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian details are required!',
  }),

  profileImage: Joi.string().uri().optional(),

  isActive: Joi.string()
    .valid('Active', 'Blocked')
    .default('Active')
    .messages({
      'any.only': 'Status must be either Active or Blocked!',
    }),
});

export default createStudentValidationSchema;