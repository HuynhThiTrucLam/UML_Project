import { useEffect, useState } from "react";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
// import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
import SearchBar from "../../../components/Searchbar/SearchBar";
import Selection from "../../../components/Select/Select";
import { Card, CardContent } from "../../../components/ui/card";
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
import axios from "axios";
import CourseDialog from "./CourseDialog";

const CourseTable = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const typeOfLicense: LicenseType[] = [
    { id: "0", name: "Tất cả" },
    { id: "Bằng lái B1", name: "Bằng lái B1" },
    { id: "Bằng lái B2", name: "Bằng lái B2" },
    { id: "Bằng lái C", name: "Bằng lái C" },
  ];
  const [licenseType, setLicenseType] = useState<LicenseType>(typeOfLicense[0]);
  const [searchString, setSearchString] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editCourse, setEditCourse] = useState<CourseType | undefined>(
    undefined
  );

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`
      );
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (course: CourseType) => {
    setEditCourse(course);
    setOpenDialog(true);
  };

  const handleSearch = (searchString: string) => {
    console.log("Search course", searchString);
    // Implement search functionality
  };

  const handleFilterCoursesByType = (typeId: string) => {
    if (typeId === "0") {
      //Call API to get all courses
      retrieveListCourses();
      return;
    }

    // Filter by license type
    retrieveListCoursesByType(typeId);
  };

  const retrieveListCoursesByType = async (typeId: string) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/courses/?license_type=${typeId}&skip=0&limit=100`
      );
      const courses = response.data.items.map((item: any) => ({
        id: item.id.split("-")[1],
        name: item.course_name,
        licenseType: item.license_type,
        startDate: item.start_date,
        endDate: item.end_date,
        registeredCount: item.current_students,
        maxStudents: item.max_students,
        examDate: item.exam_date,
      }));
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const retrieveListCourses = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/courses/?skip=0&limit=100"
      );
      const courses = response.data.items.map((item: any) => ({
        id: item.id.split("-")[1],
        name: item.course_name,
        licenseType: item.license_type,
        startDate: item.start_date,
        endDate: item.end_date,
        registeredCount: item.current_students,
        maxStudents: item.max_students,
        examDate: item.exam_date,
      }));
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    retrieveListCourses();
  }, []);

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageCourse-filter flex gap-4">
            <div className="ManageCourse-search flex-1">
              <SearchBar
                placeholder="Tìm kiếm khoá học"
                onChange={setSearchString}
                onSearch={() => {
                  handleSearch(searchString);
                }}
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
            <Button
              text="Thêm mới"
              isPrimary
              className="!w-fit h-[50px]"
              onClick={() => {
                setEditCourse(undefined);
                setOpenDialog(true);
              }}
            />
          </div>

          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin khoá học
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-50 border border-gray-200">
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
                    {course.licenseType?.type_name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${course.startDate} - ${course.endDate}`}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${course.registeredCount}/${course.maxStudents}`}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2 text-center border">
                    <Button
                      text="Sửa"
                      isPrimary
                      onClick={() => handleEditCourse(course)}
                    />
                    <Button
                      text="Xoá"
                      isPrimary={false}
                      onClick={() => handleDeleteCourse(course.id)}
                    />
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

          <CourseDialog
            mode={editCourse ? "edit" : "create"}
            open={openDialog}
            onOpenChange={setOpenDialog}
            initialData={editCourse}
            onSuccess={retrieveListCourses}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTable;
