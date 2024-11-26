import { Student } from './student.model';
import { Model, Types } from 'mongoose';


export type TGuardint = {
    fatherName : string;
    motherName : string;
    fatherOccupation : string;
    fatherContactNo : string;
    motherOccupation : string;
    motherContactNo : string;
  }

  export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
  }

  export type TLocalGuardiant = {
        name : string;
        occupation : string;
        contactNo : string;
        address : string;
  }

export type TStudent = {
  id?: string;
  user: Types.ObjectId;
  password: string,
  name: UserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  avatar?: string;
  presentAddress : string;
  permanentAddress : string;
  guardint:TGuardint;
  localGuardiant : TLocalGuardiant;
  profileImage? : string;
  isActive : 'active' | 'block'
};


// for creating statics

export interface StudentModel extends Model<TStudent> {
  isUserExsist(id : string) : Promise<TStudent | null>
}



// for creating instance



// export type StudentsMethod = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentsMethod>;
