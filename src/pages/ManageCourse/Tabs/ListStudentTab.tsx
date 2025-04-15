import React, { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import Button from "../../../components/Button/Button";
import Selection from "../../../components/Select/Select";
import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
import { mockCourseList, mockTypeOfClassList } from "../Components/ClassDialog";
import StudentsTable from "../Components/StudentsTable";
import { CourseType } from "../../../store/type/Course";
import { ClassType } from "../../../store/type/Class";

export interface mockStudents {
  id: string;
  name: string;
  theoryScore: string;
  practiceScore: string;
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
  const [selectedCourse, setSelectedCourse] = useState<CourseType>();
  const [selectedClass, setSelectedClass] = useState<ClassType>();

  const handlePrint = () => {
    // Gọi API để in danh sách học viên
    console.log("In danh sách học viên");
  };

  const handleSearch = () => {
    // Gọi API để lấy danh sách học viên theo mã lớp và mã khoá học
    console.log("courseId", selectedCourse);
    console.log("classId", selectedClass);
    setStudents(mockStudents);
  };

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
                    <p>Chọn mã lớp</p>
                    <Selection
                      data={mockTypeOfClassList}
                      placeholder="Chọn Lớp học"
                      setData={(selected) => {
                        setSelectedClass(selected);
                      }}
                      value={selectedClass?.id}
                    />
                  </div>
                  <div className="ManageCourse-student-filter-item">
                    <p>Chọn mã khoá học</p>
                    <Selection
                      data={mockCourseList}
                      placeholder="Chọn Khoá học"
                      setData={(selected) => {
                        setSelectedCourse(selected);
                      }}
                      value={selectedCourse?.id}
                    />
                  </div>
                  <Button text={"Tra cứu"} isPrimary onClick={handleSearch} />
                </div>
              </div>
              <div className="ManageCourse-student-content">
                <p>Danh sách học viên</p>

                <StudentsTable
                  data={students}
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
