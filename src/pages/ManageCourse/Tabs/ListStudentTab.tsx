import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import Button from "../../../components/Button/Button";
import Selection from "../../../components/Select/Select";
import { mockCourseList, mockTypeOfClassList } from "../Components/ClassDialog";
import StudentsTable from "../Components/StudentsTable";
import { CourseType } from "../../../store/type/Course";
import { ClassType } from "../../../store/type/Class";
import axios from "axios";
import { useAuth } from "../../../store/AuthContext";

export interface mockStudents {
  id: string;
  name: string;
  theoryScore: string;
  practiceScore: string;
  courseName?: string;
  courseId?: string;
}

export const mockStudents: mockStudents[] = [
  {
    id: "student-001",
    name: "Nguyễn Văn A",
    theoryScore: "8.5",
    practiceScore: "",
  },
  {
    id: "student-002",
    name: "Trần Thị B",
    theoryScore: "7.0",
    practiceScore: "",
  },
  {
    id: "student-003",
    name: "Lê Văn C",
    theoryScore: "9.0",
    practiceScore: "",
  },
  {
    id: "student-004",
    name: "Phạm Thị D",
    theoryScore: "6.5",
    practiceScore: "",
  },
  {
    id: "student-005",
    name: "Nguyễn Văn E",
    theoryScore: " 8.0",
    practiceScore: "",
  },
  {
    id: "student-006",
    name: "Trần Thị F",
    theoryScore: "7.5",
    practiceScore: "",
  },
  {
    id: "student-007",
    name: "Lê Văn G",
    theoryScore: "9.5",
    practiceScore: "",
  },
  {
    id: "student-008",
    name: "Phạm Thị H",
    theoryScore: "8.0",
    practiceScore: "",
  },
  {
    id: "student-009",
    name: "Nguyễn Văn I",
    theoryScore: "7.0",
    practiceScore: "",
  },
  {
    id: "student-010",
    name: "Trần Thị J",
    theoryScore: "9.0",
    practiceScore: "",
  },
];

const ListStudentTab = () => {
  const [students, setStudents] = useState<mockStudents[]>([]);
  const [studentsFiltered, setStudentsFiltered] = useState<mockStudents[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [selectedClass, setSelectedClass] = useState<ClassType>();
  const { user } = useAuth();

  const handlePrint = () => {
    // Gọi API để in danh sách học viên
    console.log("In danh sách học viên");
  };

  const handleSearch = () => {
    // Gọi API để lấy danh sách học viên theo mã lớp và mã khoá học
    console.log("courseId", selectedCourse);
    if (selectedCourse === "0") {
      return setStudentsFiltered(students);
    }
    const filteredStudents = students.filter(
      (item) => item.courseId === selectedCourse
    );
    setStudentsFiltered(filteredStudents);
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
      setSelectedCourse(courses[0]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
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
          id: student.student_id.split("-")[1],
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

  useEffect(() => {
    // Gọi API để lấy danh sách học viên khi component được mount
    retrieveStudents();
    retrieveListCourses();
  }, []);
  return (
    <div className="ManageCourse-student">
      <TabsContent value="listStudent">
        <Card>
          <CardContent>
            <div className="ManageCourse-student-container">
              <div className="ManageCourse-student-header">
                <h1>Danh sách học viên</h1>
                <div className="ManageCourse-student-filter">
                  <div className="ManageCourse-student-filter-item">
                    <p>Chọn mã khoá học</p>
                    <Selection
                      data={courses}
                      placeholder="Chọn Khoá học"
                      setData={(selected) => {
                        setSelectedCourse(selected);
                      }}
                      value={selectedCourse}
                    />
                  </div>
                  <Button
                    text={"Tra cứu"}
                    isPrimary
                    onClick={handleSearch}
                    className="h-[50px] !w-30"
                  />
                </div>
              </div>
              <div className="ManageCourse-student-content">
                <p>Danh sách học viên</p>

                <StudentsTable
                  data={studentsFiltered}
                  handlePrint={handlePrint}
                  mode="list"
                ></StudentsTable>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ListStudentTab;
