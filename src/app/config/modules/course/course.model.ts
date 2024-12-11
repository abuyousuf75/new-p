import mongoose, { model, Model, Schema, Types } from "mongoose";
import { TCourse, TCourseFacalties, TPreRequiesiteCourses } from "./corse.interface";


const preRequisitieCoursesSchema = new Schema<TPreRequiesiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref : 'Course'
  },
  isDeleted : {
    type: Boolean,
    default : false,
  }
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },

  credits: {
    type: Number,
    required: true,
    trim: true,
  },
   isDeleted : {
    type: Boolean,
    default : false,
  },
  preRequiesiteCourses: [preRequisitieCoursesSchema],
});

const courseFacaltiesSchema = new Schema<TCourseFacalties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});



export const Course = model<TCourse>('Course', courseSchema);

export const CourseFaculty = model<TCourseFacalties>('CourseFaculty', courseFacaltiesSchema);

