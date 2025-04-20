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
  selectedLicenseId?: string;
}

const ChooseDayForm = ({
  formData,
  onFormDataChange,
  selectedLicenseId,
}: ChooseDayFormProps) => {
  const [courseData, setCourseData] = useState<CourseType[]>([]);
  const [healthCheckData, setHealthCheckData] = useState<HealthCheckType[]>([]);
  const [healthCheckFiltered, setHealthCheckListFiltered] = useState<
    HealthCheckType[]
  >([]);
  const [courseFiltered, setCourseListFiltered] = useState<CourseType[]>([]);

  const handleRetieveListCourse = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/courses/?skip=0&limit=100"
      );
      const data = await response.json();
      const courses = data.items.map((item: any) => ({
        id: item.id,
        name: item.course_name,
        examDate: item.start_date,
        registrationDeadline: item.end_date,
        registeredCount: item.current_students,
        maxStudents: item.max_students,
        licenseTypeId: item.license_type_id,
      }));
      setCourseData(courses);
      await handleRetieveListHealthCheck();
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handleRetieveListHealthCheck = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          "/api/health_check_schedule/?skip=0&limit=100"
      );
      const data = await response.json();
      const healthChecks = data.items.map((item: any) => ({
        id: item.id,
        name: item.description,
        date: item.scheduled_datetime,
        address: item.address,
        courseId: item.course_id,
      }));
      setHealthCheckData(healthChecks);
    } catch (error) {
      console.error("Error fetching health check data:", error);
    }
  };

  console.log("selectedLicenseId", selectedLicenseId);
  useEffect(() => {
    if (selectedLicenseId) {
      console.log("selectedLicenseId", selectedLicenseId);
      handleRetieveListCourse();
    }
  }, [selectedLicenseId]);

  useEffect(() => {
    if (selectedLicenseId && courseData.length > 0) {
      const listCourse = courseData.filter(
        (course) => course.licenseTypeId === selectedLicenseId
      );
      setCourseListFiltered(listCourse);
      handleCourseSelect(listCourse[0].id);
    }
  }, [selectedLicenseId, courseData]);

  useEffect(() => {
    if (formData.courseId && healthCheckData.length > 0) {
      const listHealthCheck = healthCheckData.filter(
        (healthCheck) => healthCheck.courseId === formData.courseId
      );
      setHealthCheckListFiltered(listHealthCheck);
    }
  }, [formData.courseId, healthCheckData]);

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
          {courseFiltered.map((course, index) => (
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
          {healthCheckFiltered.map((health, index) => (
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
