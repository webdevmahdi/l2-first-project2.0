export type StudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNo: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: StudentName;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  email: string;
  bloodGroup?: 'A+' | 'B+' | 'A-' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'Active' | 'Blocked';
};
