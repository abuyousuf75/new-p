import { model, Schema } from "mongoose";
import { TAcademicSemester} from "./accademic.semester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const acdemicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
},
{
  timestamps : true
},
);

acdemicSemesterSchema.pre('save', async function(next){
    const isSemesterExsist = await AcademicSemester.findOne({
       year : this.year,
       name: this.name,
    });

    if(isSemesterExsist){
      throw  new Error('This semester is alredy exsist!')
    }
    next();
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', acdemicSemesterSchema);
