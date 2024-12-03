import { model, Schema, Types } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";


const academicDepertmantSchema = new Schema<TAcademicDepartment>({
  name: { type: String, required: true },
  academicFaclties: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFacaliy',
  },
},
{
    timestamps: true,
});

export const AcademicDepertment = model<TAcademicDepartment>(' AcademicDepertment', academicDepertmantSchema);