import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentName,
  Student,
} from './student.interface';

const UserNameSchema = new Schema<StudentName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const GuardianSchema = new Schema<Guardian>({
  fathersName: {
    type: String,
    required: true,
  },
  fathersOccupation: {
    type: String,
    required: true,
  },
  fathersContactNo: {
    type: String,
    required: true,
  },
  mothersName: {
    type: String,
    required: true,
  },
  mothersOccupation: {
    type: String,
    required: true,
  },
  mothersContactNo: {
    type: String,
    required: true,
  },
});
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<Student>({
  id: String,
  name: UserNameSchema,
  gender: ['Male', 'Female'],
  dateOfBirth: { type: String },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bloodGroup: ['A+', 'B+', 'A-', 'B-', 'AB-', 'AB+', 'O+', 'O-'],
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImage: String,
  isActive: ['Active', 'Blocked'],
});

const StudentModel = model<Student>('Student', StudentSchema);
export default StudentModel;
