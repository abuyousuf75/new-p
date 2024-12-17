import { TSchedule } from './offerdCourse.interface';

export const hasTimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedules: TSchedule
) => {
  for (const schedule of assignedSchedule) {
    const exsitingSartTime = new Date(`2000-02-15T${schedule.startTime}`);
    const exsitingEndTime = new Date(`2000-02-15T${schedule.endTime}`);
    const newStartingTime = new Date(`2000-02-15T${newSchedules.startTime}`);
    const newEndTime = new Date(`2000-02-15T${newSchedules.endTime}`);

    if (newStartingTime < exsitingEndTime && newEndTime > exsitingSartTime) {
      return true;
    }
   
  }
   return false;
};
