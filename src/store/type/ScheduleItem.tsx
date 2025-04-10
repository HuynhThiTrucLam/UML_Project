export interface ScheduleType {
  id: string;
  courseId: string;
  typeOfLicense: string; // Loại khóa học
  type: string; // "LyThuyet" | "ThucHanh" || "Thi"
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  teacher?: string;
}
