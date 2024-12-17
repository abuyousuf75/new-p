import { model, Schema
 } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistationStatus } from "./semesterRegistation.constant";

const semesterRegistationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: SemesterRegistationStatus,
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 15,
  },
}, {
    timestamps : true
});

export const SemesterRegistation = model<TSemesterRegistration>(
  'SemesterRegistation',semesterRegistationSchema
);