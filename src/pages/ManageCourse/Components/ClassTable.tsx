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

const mockClassData: ClassType[] = [
  {
    id: "cls001",
    name: "Lớp Lý Thuyết A1",
    course: {
      id: "crs001",
      name: "Khóa học A1 cơ bản",
      typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" },
      examDate: "2025-05-25",
      startDate: "2025-04-10",
      endDate: "2025-05-25",
      registeredCount: 15,
      maxStudents: 30,
      theoryLessons: 10,
      practiceLessons: 5,
    },
    date: "2025-04-15",
    startTime: "08:00",
    endTime: "10:00",
    type: {
      id: "Theory",
      name: "Lý thuyết",
    },
    location: "Phòng 101, Trung tâm A",
    teacher: "Nguyễn Văn A",
    maxStudents: 30,
  },
  {
    id: "cls002",
    name: "Lớp Thực Hành A2",
    course: {
      id: "crs002",
      name: "Khóa học A2 nâng cao",
      typeOfLicense: { id: "A2", name: "Giấy phép lái xe A2" },
      examDate: "2025-06-10",
      startDate: "2025-04-20",
      endDate: "2025-06-10",
      registeredCount: 10,
      maxStudents: 20,
      theoryLessons: 8,
      practiceLessons: 12,
    },
    date: "2025-04-20",
    startTime: "14:00",
    endTime: "16:00",
    type: {
      id: "Practice",
      name: "Thực hành",
    },
    location: "Sân tập B - Cơ sở 2",
    teacher: "Trần Thị B",
    maxStudents: 20,
  },
  {
    id: "cls003",
    name: "Lớp Thi A1",
    course: {
      id: "crs001",
      name: "Khóa học A1 cơ bản",
      typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" },
      examDate: "2025-05-25",
      startDate: "2025-04-10",
      endDate: "2025-05-25",
      registeredCount: 15,
      maxStudents: 30,
      theoryLessons: 10,
      practiceLessons: 5,
    },
    date: "2025-05-20",
    startTime: "08:00",
    endTime: "12:00",
    type: {
      id: "Exam",
      name: "Thi",
    },
    location: "Phòng thi số 3",
    maxStudents: 25,
  },
];

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

  useEffect(() => {
    //Call API to get all classes
    setClasses(mockClassData);
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
                  <TableCell className="text-center border">{cls.id}</TableCell>
                  <TableCell className="text-center border">
                    {cls.course.id}
                  </TableCell>
                  <TableCell className="text-center border">
                    {cls.course.typeOfLicense.name}
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
