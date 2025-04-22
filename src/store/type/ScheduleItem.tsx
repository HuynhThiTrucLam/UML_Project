import { LicenseType } from "./Lincense";

export interface ScheduleType {
  id: string;
  courseId: string;
  typeOfLicense: LicenseType; // Loại khóa học
  type: string; // "LyThuyet" | "ThucHanh" || "Thi"
  startTime: string;
  endTime: string;
  location: string;
  teacher?: string;
}
