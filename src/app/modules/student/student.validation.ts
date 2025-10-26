import z from 'zod';

const studentNameZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required! Please provide the student’s first name.')
    .max(20, 'First name can not be more than 20 characters.')
    .refine(
      (value) => {
        const formatted = value.charAt(0).toUpperCase() + value.slice(1);
        return value === formatted;
      },
      { message: 'First name must start with a capital letter.' }
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required! Please provide the student’s last name.'),
});

// Guardian Schema
const guardianZodSchema = z.object({
  fathersName: z.string().trim().min(1, "Father's name is required! Please provide the father's name."),
  fathersOccupation: z.string().trim().min(1, "Father's occupation is required! Please specify the father's job."),
  fathersContactNo: z.string().trim().min(1, "Father's contact number is required! Please provide a valid phone number."),
  mothersName: z.string().trim().min(1, "Mother's name is required! Please provide the mother's name."),
  mothersOccupation: z.string().trim().min(1, "Mother's occupation is required! Please specify the mother's job."),
  mothersContactNo: z.string().trim().min(1, "Mother's contact number is required! Please provide a valid phone number."),
});

// Local Guardian Schema
const localGuardianZodSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required! Please provide their full name.'),
  occupation: z.string().trim().min(1, 'Local guardian occupation is required!'),
  contactNo: z.string().trim().min(1, 'Local guardian contact number is required!'),
  address: z.string().trim().min(1, 'Local guardian address is required!'),
});

// ---------- Main Student Schema ----------
const createStudentZodSchema = z.object({
  id: z.string().trim().min(1, 'Student ID is required!'),

  name: studentNameZodSchema,
  gender: z.enum(['Male', 'Female']),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().trim().min(1, 'Primary contact number is required! Please provide a valid number.'),
  emergencyContactNo: z.string().trim().min(1, 'Emergency contact number is required!'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required! Please provide a valid email.')
    .email('Invalid email format.'),
  bloodGroup: z
    .enum(['A+', 'B+', 'A-', 'B-', 'AB-', 'AB+', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().trim().min(1, 'Present address is required! Please provide a current address.'),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required! Please provide a permanent address.'),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImage: z.string().url().optional(),
  isActive: z.enum(['Active', 'Blocked']).default('Active'),
});

export default createStudentZodSchema;