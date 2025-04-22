import { useEffect, useState } from "react";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
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
import { ClassType, TypeOfClass } from "../../../store/type/Class";
import ClassDialog from "./ClassDialog";
import axios from "axios";
import dayjs from "dayjs";

export const mockTypeOfClass: TypeOfClass[] = [
  {
    id: "All",
    name: "Tất cả",
  },
  {
    id: "Theory",
    name: "Lý thuyết",
  },
  {
    id: "Practice",
    name: "Thực hành",
  },
];

// const mockClassData: ClassType[] = [
//   {
//     id: "cls001",
//     name: "Lớp Lý Thuyết A1",
//     course: {
//       id: "crs001",
//       name: "Khóa học A1 cơ bản",
//       typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" },
//       examDate: "2025-05-25",
//       startDate: "2025-04-10",
//       endDate: "2025-05-25",
//       registeredCount: 15,
//       maxStudents: 30,
//       theoryLessons: 10,
//       practiceLessons: 5,
//     },
//     date: "2025-04-15",
//     startTime: "08:00",
//     endTime: "10:00",
//     type: {
//       id: "Theory",
//       name: "Lý thuyết",
//     },
//     location: "Phòng 101, Trung tâm A",
//     teacher: "Nguyễn Văn A",
//     maxStudents: 30,
//   },
//   {
//     id: "cls002",
//     name: "Lớp Thực Hành A2",
//     course: {
//       id: "crs002",
//       name: "Khóa học A2 nâng cao",
//       typeOfLicense: { id: "A2", name: "Giấy phép lái xe A2" },
//       examDate: "2025-06-10",
//       startDate: "2025-04-20",
//       endDate: "2025-06-10",
//       registeredCount: 10,
//       maxStudents: 20,
//       theoryLessons: 8,
//       practiceLessons: 12,
//     },
//     date: "2025-04-20",
//     startTime: "14:00",
//     endTime: "16:00",
//     type: {
//       id: "Practice",
//       name: "Thực hành",
//     },
//     location: "Sân tập B - Cơ sở 2",
//     teacher: "Trần Thị B",
//     maxStudents: 20,
//   },
//   {
//     id: "cls003",
//     name: "Lớp Thi A1",
//     course: {
//       id: "crs001",
//       name: "Khóa học A1 cơ bản",
//       typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" },
//       examDate: "2025-05-25",
//       startDate: "2025-04-10",
//       endDate: "2025-05-25",
//       registeredCount: 15,
//       maxStudents: 30,
//       theoryLessons: 10,
//       practiceLessons: 5,
//     },
//     date: "2025-05-20",
//     startTime: "08:00",
//     endTime: "12:00",
//     type: {
//       id: "Exam",
//       name: "Thi",
//     },
//     location: "Phòng thi số 3",
//     maxStudents: 25,
//   },
// ];

const ClassTable = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [classType, setClassType] = useState<TypeOfClass>(mockTypeOfClass[0]);
  const [searchString, setSearchString] = useState<string>("");

  const handleSearch = (searchString: string) => {
    console.log("Search class", searchString);
  };

  const handleClassByType = (typeId: string) => {
    if (typeId === "All") {
      //Call API to get all courses
      console.log("Get all class", typeId);
      return;
    }
    console.log("GetClassByType", typeId);
  };

  const handleDeleteClass = (id: string) => {
    console.log("Delete class");
  };

  const retriveClasses = async () => {
    try {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);
      const startTime = dayjs(startDate).format("YYYY-MM-DD");
      const endTime = dayjs(endDate).format("YYYY-MM-DD");
      console.log("startTime", startTime);
      console.log("endTime", endTime);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/schedule/?start_time=2023-10-01&end_time=2025-10-07`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        // {
        //   "course_id": "5b1df47f-46d5-4c54-a237-b1e23eb914b9",
        //   "start_time": "2025-04-21T07:00:00.207000",
        //   "end_time": "2025-04-21T09:00:00.208000",
        //   "location": "string",
        //   "type": "theory",
        //   "instructor_id": null,
        //   "max_students": 65,
        //   "course": {
        //     "id": "5b1df47f-46d5-4c54-a237-b1e23eb914b9",
        //     "name": "Khóa học A1 nâng cao"
        //   },
        //   "id": "b74c9f8c-c4ca-46cc-a39a-6a486bac0db0",
        //   "license_type": {
        //     "id": "2533a434-35c7-47fa-9306-8e45da5ec3b4",
        //     "type_name": "Hạng bằng lái A1"
        //   }
        // },
        const data = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          course: {
            id: item.course.id,
            name: item.course.name,
            licenseType: item.license_type,
          },
          date: new Date(item.start_time).toLocaleDateString("vi-VN"),
          startTime: new Date(item.start_time).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: new Date(item.end_time).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: {
            id: item.type,
            name:
              item.type === "theory"
                ? "Lý thuyết"
                : item.type === "practice"
                ? "Thực hành"
                : "Thi",
          },
          location: item.location,
          maxStudents: item.max_students,
        }));
        setClasses(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching classes:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    //Call API to get all classes
    retriveClasses();
  }, []);

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageCourse-filter flex gap-4">
            <div className="ManageCourse-search flex-1">
              <SearchBar
                placeholder="Tra cứu thông tin lớp học"
                onChange={setSearchString}
                onSearch={() => {
                  handleSearch(searchString);
                }}
              />
            </div>
            <div className="ManageCourse-type w-60">
              <Selection
                placeholder={classType.name}
                data={mockTypeOfClass}
                setData={(selected) => {
                  setClassType(selected);
                  handleClassByType(classType.id);
                }}
              />
            </div>
          </div>

          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin các lớp học
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-50 border border-gray-200">
                <TableHead className="text-center border">Mã lớp học</TableHead>
                <TableHead className="text-center border">
                  Mã khoá học
                </TableHead>
                <TableHead className="text-center border">
                  Hạng bằng lái
                </TableHead>
                <TableHead className="text-center border">Loại</TableHead>
                <TableHead
                  className="text-center flex justify-center items-center gap-1 border"
                  onClick={() => {}}
                >
                  <p>Thời gian</p>
                  <FilterArrow />
                </TableHead>
                <TableHead className="text-center border">Địa điểm</TableHead>
                <TableHead className="text-center border">
                  Số học viên
                </TableHead>
                <TableHead className="text-center border"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id} className="border border-gray-200">
                  <TableCell className="text-center border">
                    {cls.id.split("-")[1]}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.course.id.split("-")[1]}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.course?.licenseType?.type_name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.type.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {`${cls.date} ${cls.startTime} - ${cls.endTime}`}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.location}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.maxStudents}
                  </TableCell>
                  <TableCell className="flex gap-2 text-center border">
                    <Button
                      text="Xoá"
                      isPrimary={false}
                      onClick={() => handleDeleteClass(cls.id)}
                    />
                    <ClassDialog mode="edit" initialData={cls} />
                  </TableCell>
                </TableRow>
              ))}
              {classes.length === 0 && (
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

export default ClassTable;
