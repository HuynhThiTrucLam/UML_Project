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
// import CourseDialog from "./CourseDialog";

// "course_name": "Khóa học A1 nâng cao",
//     "license_type_id": "2533a434-35c7-47fa-9306-8e45da5ec3b4",
//     "start_date": "2025-05-01",
//     "end_date": "2025-06-30",
//     "max_students": 30,
//     "price": 2500000,
//     "status": "active",
//     "id": "5b1df47f-46d5-4c54-a237-b1e23eb914b9",
//     "current_students": 10,
//     "created_at": "2025-04-20",
//     "updated_at": "2025-04-20"
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

  const handleDeleteCourse = (courseId: string) => {
    console.log("Xoá course", courseId);
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const handleSearch = (searchString: string) => {
    console.log("Search course", searchString);
  };

  const handleFilterCoursesByType = (typeId: string) => {
    if (typeId === "0") {
      //Call API to get all courses
      console.log("Get all course", typeId);
      // setCourses(mockCourses);
      return;
    }

    console.log("GetCourseById", typeId);
    // const filtered = mockCourses.filter(
    //   (course) => course.licenseType.id === typeId
    // );
    // setCourses(filtered);
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
                  {/* <TableCell className="text-center border">
                    {`${course.theoryLessons} LT + ${course.practiceLessons} TH`}
                  </TableCell> */}
                  <TableCell className="text-center border">
                    {course.endDate}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2 text-center border">
                    <Button
                      text="Xoá"
                      isPrimary={false}
                      onClick={() => handleDeleteCourse(course.id)}
                    />
                    {/* <CourseDialog mode="edit" initialData={course} /> */}
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
