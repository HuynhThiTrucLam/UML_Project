import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { CardContent } from "../../components/ui/card";
import Button from "../../components/Button/Button";
import {
  mockCourseList,
  mockTypeOfClassList,
} from "../ManageCourse/Components/ClassDialog";
import Selection from "../../components/Select/Select";
import "./ManageExam.scss";
import StudentsTable from "../ManageCourse/Components/StudentsTable";
import { mockStudents } from "../ManageCourse/Tabs/ListStudentTab";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { CourseType } from "../../store/type/Course";

const ManageExam = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<mockStudents[]>([]);
  const [studentsFiltered, setStudentsFiltered] = useState<mockStudents[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handlePrint = () => {
    // Gọi API để in danh sách học viên
    console.log("In danh sách học viên");
  };
  const handleGetStudents = () => {
    if (selectedCourse === "0") {
      return setStudentsFiltered(students);
    }
    const filteredStudents = students.filter(
      (item) => item.courseId === selectedCourse
    );
    setStudentsFiltered(filteredStudents);
  };
  const retrieveStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students/registered/`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        let studentsData = response.data.map((student: any) => ({
          id: student.student_id,
          name: student.name,
          theoryScore: student.theory_score || "",
          practiceScore: student.practice_score || "",
          courseName: student.course_name,
          courseId: student.course_id,
        }));
        setStudents(studentsData);
        setStudentsFiltered(studentsData);
      }
    } catch (error) {
      console.error("Error retrieving students:", error);
      // Handle the error
    }
  };

  const retrieveListCourses = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/courses/?skip=0&limit=100"
      );
      let courses = response.data.items.map((item: any) => ({
        id: item.id,
        name: item.course_name,
        licenseType: item.license_type,
        startDate: item.start_date?.split("-").reverse().join("/"),
        endDate: item.end_date?.split("-").reverse().join("/"),
        registeredCount: item.current_students,
        maxStudents: item.max_students,
        price: item.price,
      }));
      courses = [{ id: "0", name: "Tất cả" }, ...courses];
      setCourses(courses);
      setSelectedCourse(courses[0].id);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    retrieveStudents();
    retrieveListCourses();
  }, []);

  return (
    <div className="ManageExam">
      <div className="ManageExam-container">
        <div className="ManageExam-header">
          <h1>Nhập điểm thi</h1>
          <div className="ManageExam-filter">
            <div className="ManageExam-filter-item">
              <p>Chọn mã khoá học</p>
              <Selection
                data={courses}
                placeholder="Chọn Khoá học"
                setData={(course) => setSelectedCourse(course)}
                value={selectedCourse}
              />
            </div>
            <Button
              text={"Tra cứu"}
              isPrimary
              onClick={handleGetStudents}
              className="h-[50px]"
            />
          </div>
        </div>
        <div className="ManageExam-content">
          <p>Danh sách học viên</p>
          <StudentsTable
            data={studentsFiltered}
            handlePrint={handlePrint}
            mode="edit"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageExam;
