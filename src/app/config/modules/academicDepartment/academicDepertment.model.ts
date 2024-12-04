
import httpStatus from 'http-status-codes';
import { model, Schema, Types } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../erroes/AppError';

const academicDepertmantSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true },
    academicFaclties: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFacaliy',
    },
  },
  {
    timestamps: true,
  }
);



academicDepertmantSchema.pre('save', async function (next) {
  const isAcademicDepartmentExsist = await AcademicDepertment.findOne({
    name: this.name,
  });
  if (isAcademicDepartmentExsist) {
    throw new Error(`${isAcademicDepartmentExsist.name} is alredy exsist`);
  }
  next();
});

academicDepertmantSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAcademicDepartmentExsist = await AcademicDepertment.findOne(query);
  if (!isAcademicDepartmentExsist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exsist!'
    );
  }
  next();
});




export const AcademicDepertment = model<TAcademicDepartment>(
  'AcademicDepertment',
  academicDepertmantSchema
);
