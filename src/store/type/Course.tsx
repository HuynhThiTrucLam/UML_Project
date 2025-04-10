import { LicenseType } from "./Lincense";

export interface CourseType {
  id: string;
  name: string;
  typeOfLicense: LicenseType; // Loại khóa học
  examDate: string; // Ngày thi
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
  registeredCount: number; // Số lượng đã đăng ký
  maxStudents: number; // Số lượng học viên tối đa
  theoryLessons?: number; // Số buổi học lý thuyết
  practiceLessons?: number; // Số buổi học thực hành
}
