import { Card, CardContent } from "../../../components/ui/card";
import { useEffect, useState, useMemo } from "react";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
import SearchBar from "../../../components/Searchbar/SearchBar";
import Selection from "../../../components/Select/Select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { CourseType } from "../../../store/type/Course";
import { LicenseType } from "../../../store/type/Lincense";
import AddNewCourse from "./AddNewCourse";

// Mock data
export const mockCourses: CourseType[] = [
  {
    id: "course-001",
    name: "Khóa học lái xe B1 - Tháng 4",
    typeOfLicense: { id: "3", name: "Bằng lái B1" },
    examDate: "2025-08-10",
    startDate: "2025-04-15",
    endDate: "2025-08-05",
    registeredCount: 25,
    maxStudents: 30,
    theoryLessons: 0,
    practiceLessons: 0,
  },
  {
    id: "course-002",
    name: "Khóa học lái xe B2 - Tháng 5",
    typeOfLicense: { id: "4", name: "Bằng lái B2" },
    examDate: "2025-09-01",
    startDate: "2025-05-10",
    endDate: "2025-08-28",
    registeredCount: 28,
    maxStudents: 30,
    theoryLessons: 0,
    practiceLessons: 0,
  },
  {
    id: "course-003",
    name: "Khóa học lái xe C - Tháng 6",
    typeOfLicense: { id: "5", name: "Bằng lái C" },
    examDate: "2025-10-15",
    startDate: "2025-06-05",
    endDate: "2025-10-01",
    registeredCount: 18,
    maxStudents: 25,
    theoryLessons: 0,
    practiceLessons: 0,
  },
  {
    id: "course-004",
    name: "Khóa học lái xe B1 - Tháng 7",
    typeOfLicense: { id: "3", name: "Bằng lái B1" },
    examDate: "2025-11-12",
    startDate: "2025-07-10",
    endDate: "2025-11-05",
    registeredCount: 30,
    maxStudents: 30,
    theoryLessons: 0,
    practiceLessons: 0,
  },
  {
    id: "course-005",
    name: "Khóa học lái xe B2 - Tháng 4 (Tối)",
    typeOfLicense: { id: "4", name: "Bằng lái B2" },
    examDate: "2025-08-20",
    startDate: "2025-04-20",
    endDate: "2025-08-15",
    registeredCount: 15,
    maxStudents: 30,
    theoryLessons: 0,
    practiceLessons: 0,
  },
];

const CourseTable = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [licenseType, setLicenseType] = useState<LicenseType>(typeOfLicense[0]);
  const [searchString, setSearchString] = useState<string>("");

  const handleDeleteCourse = (courseId: string) => {
    console.log("Xoá course", courseId);
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const handleFilterCoursesByType = (typeId: string) => {
    if (typeId === "0") {
      //Call API to get all courses
      console.log("Get all course", typeId);
      setCourses(mockCourses);
      return;
    }

    console.log("GetCourseById", typeId);
    const filtered = mockCourses.filter(
      (course) => course.typeOfLicense.id === typeId
    );
    setCourses(filtered);
  };

  useEffect(() => {
    // Replace with API call
    setCourses(mockCourses);
  }, [courses]);

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageCourse-filter flex gap-4">
            <div className="ManageCourse-search flex-1">
              <SearchBar
                placeholder="Tìm kiếm khoá học"
                onChange={setSearchString}
                onSearch={() => {}}
              />
            </div>
            <div className="ManageCourse-type w-60">
              <Selection
                placeholder={licenseType.name}
                data={typeOfLicense}
                setData={(selected) => {
                  setLicenseType(selected);
                  handleFilterCoursesByType(selected.id);
                }}
              />
            </div>
          </div>

          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin khoá học
            </TableCaption>
            <TableHeader>
              <TableRow className="border border-gray-200">
                <TableHead className="text-center border">
                  Mã khoá học
                </TableHead>
                <TableHead className="text-center border">
                  Hạng bằng lái
                </TableHead>
                <TableHead
                  className="text-center flex justify-center items-center gap-1 border"
                  onClick={() => {}}
                >
                  <p>Thời hạn</p>
                  <FilterArrow />
                </TableHead>
                <TableHead className="text-center border">
                  Số học viên
                </TableHead>
                <TableHead className="text-center border">Số buổi</TableHead>
                <TableHead className="text-center border">
                  Ngày thi dự kiến
                </TableHead>
                <TableHead className="text-center border"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="border hover:bg-gray-100">
                  <TableCell className="text-center border">
                    {course.id}
                  </TableCell>
                  <TableCell className="text-center border">
                    {course.typeOfLicense.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${course.startDate} - ${course.endDate}`}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${course.registeredCount}/${course.maxStudents}`}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${course.theoryLessons} LT + ${course.practiceLessons} TH`}
                  </TableCell>
                  <TableCell className="text-center border">
                    {course.examDate}
                  </TableCell>
                  <TableCell className="text-center border">
                    <Button
                      text="Xoá"
                      isPrimary={false}
                      onClick={() => handleDeleteCourse(course.id)}
                    />
                    <AddNewCourse mode="edit" initialData={course} />
                  </TableCell>
                </TableRow>
              ))}
              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Không có khoá học nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTable;
