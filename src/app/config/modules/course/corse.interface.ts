import { Types } from "mongoose";

export type TPreRequiesiteCourses = {
    course : Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
  title: string;
  code: number;
  prefix: string;
  credits: number;
  preRequiesiteCourses: [TPreRequiesiteCourses];
  isDeleted?: boolean;
};

export type TCourseFacalties = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};