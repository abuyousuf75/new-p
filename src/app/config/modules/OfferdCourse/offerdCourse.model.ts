
import { model, Schema } from "mongoose";
import { TofferdCourse } from "./offerdCourse.interface";
import { Days } from "./offerdCourse.constant";

const offerdCourseSchema = new Schema<TofferdCourse>({
  semesterRegistation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistation',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicFacaulty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFacality',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepertment',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  maxCapacity: {
    type: Number,
    required: true,
    default: 10,
  },
  section: {
    type: Number,
    required: true,
  },
  days:[{
    type: String,
    enum: Days,
  }],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const OfferdCourse = model<TofferdCourse>('OfferdCourse', offerdCourseSchema);