import { Schema, model, connect } from 'mongoose';
import {
  TGuardint,
  TLocalGuardiant,
  TStudent,
  StudentModel,
  UserName,
} from './student.interface';
import validator from 'validator';


const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== firstNameStr) {
          return false;
        }
        return true;
      },
      message: '{VALUE} is not in capitalize formate'
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value : string) => 
        validator.isAlpha(value),
      message : `{VALUE} is not valid`
    }
  },
});

const gurdiantSchema = new Schema<TGuardint>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    maxlength: [20, 'Name is not more then 20 word'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
});

const localGuardiantSchema = new Schema<TLocalGuardiant>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'User'
  },
 
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    // validate : {
    //   validator : (value:string) => validator.isEmail(value),
    //   message: `{VALUE} is not validte email type`
    // }
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardint: {
    type: gurdiantSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardiant: {
    type: localGuardiantSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImage: { type: String },
 
},{
  toJSON: {
    virtuals : true
  }
});


// virtual mongoose

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// creting an custom instance method

studentSchema.statics.isUserExsist = async function(id : string){
  const exsistingUser = await Student.findOne({id});
  return exsistingUser
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
