export interface CourseType {
  id: string;
  name: string;
  examDate: string; // Ngày thi
  registrationDeadline: string; // Thời hạn đăng ký
  registeredCount: number; // Số lượng đã đăng ký
  maxStudents: number; // Số lượng học viên tối đa
}

// classCode: "#ABCD",
// classroom: "A01",
// date: "2025-04-03", // Thursday
// startTime: "9:00 AM",
// studentCount: 30,
// teacher: "Nguyễn Văn A",
// licenseTypeId: "4",
