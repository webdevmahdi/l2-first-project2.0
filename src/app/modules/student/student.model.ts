import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentName,
  Student,
} from './student.interface';

// Name Schema
  const UserNameSchema = new Schema<StudentName>({
    firstName: {
      type: String,
      required: [
        true,
        'First name is required! Please provide the student’s first name.',
      ],
      maxLength: [20, "First Name can not be more than 20 characters."],
      trim: true,
      validate: {
        validator: function(value){
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize format."
      }
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [
        true,
        'Last name is required! Please provide the student’s last name.',
      ],
      trim: true,
    },
  });

// Guardian Schema
const GuardianSchema = new Schema<Guardian>({
  fathersName: {
    type: String,
    required: [
      true,
      "Father's name is required! Please provide the father's name.",
    ],
    trim: true,
  },
  fathersOccupation: {
    type: String,
    required: [
      true,
      "Father's occupation is required! Please specify the father's job.",
    ],
    trim: true,
  },
  fathersContactNo: {
    type: String,
    required: [
      true,
      "Father's contact number is required! Please provide a valid phone number.",
    ],
    trim: true,
  },
  mothersName: {
    type: String,
    required: [
      true,
      "Mother's name is required! Please provide the mother's name.",
    ],
    trim: true,
  },
  mothersOccupation: {
    type: String,
    required: [
      true,
      "Mother's occupation is required! Please specify the mother's job.",
    ],
    trim: true,
  },
  mothersContactNo: {
    type: String,
    required: [
      true,
      "Mother's contact number is required! Please provide a valid phone number.",
    ],
    trim: true,
  },
});

// Local Guardian Schema
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      'Local guardian name is required! Please provide their full name.',
    ],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required!'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required!'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required!'],
    trim: true,
  },
});

// Main Student Schema
const StudentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required!'],
    unique: true,
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Student name information is required!'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender must be either Male or Female!',
    },
    required: [true, 'Gender is required! Please select Male or Female.'],
  },
  dateOfBirth: {
    type: String,
  },
  contactNo: {
    type: String,
    required: [
      true,
      'Primary contact number is required! Please provide a valid number.',
    ],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required!'],
  },
  email: {
    type: String,
    required: [
      true,
      'Email address is required! Please provide a valid email.',
    ],
    unique: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'B+', 'A-', 'B-', 'AB-', 'AB+', 'O+', 'O-'],
      message:
        'Invalid blood group! Must be one of A+, A-, B+, B-, AB+, AB-, O+, or O-.',
    },
  },
  presentAddress: {
    type: String,
    required: [
      true,
      'Present address is required! Please provide a current address.',
    ],
  },
  permanentAddress: {
    type: String,
    required: [
      true,
      'Permanent address is required! Please provide a permanent address.',
    ],
  },
  guardian: {
    type: GuardianSchema,
    required: [
      true,
      'Guardian details are required! Please include parent information.',
    ],
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: [true, 'Local guardian details are required!'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['Active', 'Blocked'],
      message: 'Status must be either Active or Blocked!',
    },
    default: 'Active',
  },
});

const StudentModel = model<Student>('Student', StudentSchema);
export default StudentModel;
