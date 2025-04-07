export interface ScheduleItem {
  classCode: string;
  classroom: string;
  date: string;
  startTime: string;
  studentCount: number;
  teacher?: string;
  licenseTypeId: string;
}
