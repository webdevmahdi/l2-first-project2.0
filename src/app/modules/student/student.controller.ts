import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import createStudentZodSchema from './student.validation';
// import createStudentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    
    //Receiving Clients Data
    const { student: studentData } = req.body;
    // Data validation using Zod
    const studentValidatedData = createStudentZodSchema.parse(studentData);
    
    // Student validation using JOI
    // const {error, value} = createStudentValidationSchema.validate(studentData);
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong!",
    //     error: error.details
    //   })
    // }


    const result = await StudentServices.createStudentIntoDB(studentValidatedData);
    res.status(200).json({
      success: true,
      message: 'Student account created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err
    })
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student is retrieved successfully!',
    data: result,
  });
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
