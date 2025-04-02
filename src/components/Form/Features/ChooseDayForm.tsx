import React, { use, useEffect, useState } from "react";
import "../Form.scss";
import Course from "../../Course/Course";
import HealthCheck from "../../Course/HealthCheck";
import { CourseType } from "../../../store/type/Course";
import { HealthCheckType } from "../../../store/type/HealthCheck";
const mockData = [
  {
    id: "A1-001",
    name: "Lớp A1 - Cơ bản",
    examDate: "2025-06-15", // Ngày thi dự kiến
    registrationDeadline: "2025-04-30", // Thời hạn đăng ký
    registeredCount: 20, // Số lượng đã đăng ký
    maxStudents: 30, // Số lượng học viên tối đa
  },
  {
    id: "B2-005",
    name: "Lớp B2 - Nâng cao",
    examDate: "2025-06-20",
    registrationDeadline: "2025-05-05",
    registeredCount: 35,
    maxStudents: 40,
  },
  {
    id: "A2-002",
    name: "Lớp A2 - Cơ bản",
    examDate: "2025-06-10",
    registrationDeadline: "2025-04-20",
    registeredCount: 15,
    maxStudents: 30,
  },
  {
    id: "C-007",
    name: "Lớp C - Chuyên nghiệp",
    examDate: "2025-07-05",
    registrationDeadline: "2025-05-30",
    registeredCount: 10,
    maxStudents: 15,
  },
  {
    id: "B1-003",
    name: "Lớp B1 - Cơ bản",
    examDate: "2025-06-18",
    registrationDeadline: "2025-05-10",
    registeredCount: 25,
    maxStudents: 30,
  },
];

const mockHealthCheck = [
  {
    id: "1",
    name: "Khám sức khỏe tổng quát",
    date: "2025-06-15",
    address: "Bệnh viện ABC, Đường XYZ, TP.HCM",
  },
  {
    id: "2",
    name: "Khám sức khỏe định kỳ",
    date: "2025-07-20",
    address: "Phòng khám XYZ, Đường ABC, Hà Nội",
  },
  {
    id: "3",
    name: "Khám sức khỏe chuyên khoa",
    date: "2025-08-10",
    address: "Bệnh viện DEF, Đường UVW, Đà Nẵng",
  },
];

interface ChooseDayFormProps {
  formData: {
    courseId: string;
    healthCheckId: string;
  };
  onFormDataChange: (
    data: Partial<{ courseId: string; healthCheckId: string }>
  ) => void;
}

const ChooseDayForm = ({ formData, onFormDataChange }: ChooseDayFormProps) => {
  const [courseData, setCourseData] = useState<CourseType[]>([]);
  const [healthCheckData, setHealthCheckData] = useState<HealthCheckType[]>([]);

  useEffect(() => {
    setCourseData(mockData);
    setHealthCheckData(mockHealthCheck);
  }, []);

  const handleCourseSelect = (courseId: string) => {
    onFormDataChange({ courseId });
  };

  const handleHealthCheckSelect = (healthCheckId: string) => {
    onFormDataChange({ healthCheckId });
  };

  return (
    <div className="Form-choose">
      <div className="Form-choose-course">
        <p>* Chọn một khoá học</p>
        <div className="Form-choose-course-list">
          {courseData.map((course, index) => (
            <Course
              data={course}
              isSelected={formData.courseId === course.id}
              onClick={() => handleCourseSelect(course.id)}
            />
          ))}
        </div>
      </div>
      <div className="Form-choose-course">
        <p>* Chọn lịch khám sức khoẻ</p>
        <div className="Form-choose-course-list">
          {healthCheckData.map((health, index) => (
            <HealthCheck
              data={health}
              isSelected={formData.healthCheckId === health.id}
              onClick={(healthId) => {
                handleHealthCheckSelect(health.id);
              }}
            />
          ))}
        </div>
      </div>
      <div className="Form-choose-check"></div>
    </div>
  );
};

export default ChooseDayForm;
