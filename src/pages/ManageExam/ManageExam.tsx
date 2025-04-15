import React, { useState } from "react";
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

const ManageExam = () => {
  const [students, setStudents] = useState<mockStudents[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handlePrint = () => {
    // Gọi API để in danh sách học viên
    console.log("In danh sách học viên");
  };

  const handleGetStudents = () => {
    // Gọi API để lấy danh sách học viên theo mã lớp và mã khoá học
    console.log("courseId", selectedCourse);
    setStudents(mockStudents);
  };

  return (
    <div className="ManageExam">
      <div className="ManageExam-container">
        <div className="ManageExam-header">
          <h1>Nhập điểm thi</h1>
          <div className="ManageExam-filter">
            <div className="ManageExam-filter-item">
              <p>Chọn mã khoá học</p>
              <Selection
                data={mockCourseList}
                placeholder="Chọn Khoá học"
                setData={() => {}}
                // value={selectedCourse?.id}
              />
            </div>
            <Button text={"Tra cứu"} isPrimary onClick={handleGetStudents} />
          </div>
        </div>
        <div className="ManageExam-content">
          <p>Danh sách học viên</p>
          <StudentsTable
            data={students}
            handlePrint={handlePrint}
            mode="edit"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageExam;
