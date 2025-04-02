export interface CourseType {
  id: string;
  name: string;
  examDate: string; // Ngày thi
  registrationDeadline: string; // Thời hạn đăng ký
  registeredCount: number; // Số lượng đã đăng ký
  maxStudents: number; // Số lượng học viên tối đa
}

export interface CourseProps {
  data: CourseType;
  onClick: (courseId: string) => void;
}
