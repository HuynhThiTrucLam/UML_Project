export interface CourseType {
  id: string;
  name: string;
  licenseType: {
    id: string; // ID loại khóa học
    type_name: string; // Tên loại khóa học
  }; // Loại khóa học
  startDate: Date; // Ngày bắt đầu
  endDate: Date; // Ngày kết thúc
  registeredCount: number; // Số lượng đã đăng ký
  maxStudents: number; // Số lượng học viên tối đa
}
