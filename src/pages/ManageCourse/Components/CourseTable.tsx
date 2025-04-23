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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "../../../store/AuthContext";

const CourseTable = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [coursesFiltered, setCoursesFiltered] = useState<CourseType[]>([]);
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);
  const [licenseType, setLicenseType] = useState<LicenseType>({
    id: "0",
    name: "Tất cả",
  });
  const [searchString, setSearchString] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editCourse, setEditCourse] = useState<CourseType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseType | null>(null);
  const { user } = useAuth();

  const fetchLicenseTypes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/license_type/?skip=0&limit=100`
      );

      // Add "All" option at the beginning
      const allOption: LicenseType = { id: "0", name: "Tất cả" };
      const types = [
        allOption,
        ...response.data.items.map((item: any) => ({
          id: item.id,
          name: item.type_name,
        })),
      ];

      setLicenseTypes(types);
    } catch (error) {
      console.error("Error fetching license types:", error);
      // Fallback to default values if API fails
      setLicenseTypes([
        { id: "0", name: "Tất cả" },
        { id: "Bằng lái B1", name: "Bằng lái B1" },
        { id: "Bằng lái B2", name: "Bằng lái B2" },
        { id: "Bằng lái C", name: "Bằng lái C" },
      ]);
    }
  };

  useEffect(() => {
    if (searchString === "") {
      setCoursesFiltered(courses);
      return;
    }
    const filtered = courses.filter((item) => {
      const licenseMatch = item.licenseType.type_name
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const nameMatch = item.id
        .split("-")[1]
        .toLowerCase()
        .includes(searchString.toLowerCase());
      return licenseMatch || nameMatch;
    });
    setCoursesFiltered(filtered);
  }, [searchString, courses]);

  const handleConfirmDelete = (course: CourseType) => {
    setCourseToDelete(course);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 204) {
        setCourses((prev) =>
          prev.filter((course) => course.id !== courseToDelete.id)
        );
        setCoursesFiltered((prev) =>
          prev.filter((course) => course.id !== courseToDelete.id)
        );
        toast.success(`Đã xóa khóa học: ${courseToDelete.id.split("-")[1]}`, {
          duration: 3000,
          className: "[&>[data-icon]]:!text-green-500",
        });
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Không thể xóa khóa học. Vui lòng thử lại sau.", {
        duration: 3000,
        className: "[&>[data-icon]]:!text-red-500",
      });
    } finally {
      setDeleteConfirmOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleEditCourse = (course: CourseType) => {
    setEditCourse(course);
    setOpenDialog(true);
  };

  const handleFilterCoursesByType = (typeId: string) => {
    if (typeId === "0") {
      //Call API to get all courses
      setCoursesFiltered(courses);
      return;
    }

    const filtered = courses.filter((item) => item.licenseType.id === typeId);

    setCoursesFiltered(filtered);
  };

  const retrieveListCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/courses/?skip=0&limit=100"
      );
      const courses = response.data.items.map((item: any) => ({
        id: item.id,
        name: item.course_name,
        licenseType: item.license_type,
        startDate: item.start_date?.split("-").reverse().join("/"),
        endDate: item.end_date?.split("-").reverse().join("/"),
        registeredCount: item.current_students,
        maxStudents: item.max_students,
        price: item.price,
      }));
      setCourses(courses);
      setCoursesFiltered(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch license types when component mounts
    fetchLicenseTypes();
    // Fetch courses when component mounts
    retrieveListCourses();
  }, []);

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageCourse-filter flex gap-4">
            <div className="ManageCourse-search flex-1">
              <SearchBar
                value={searchString}
                placeholder="Tìm kiếm khoá học"
                onChange={(value) => setSearchString(value)}
              />
            </div>
            <div className="ManageCourse-type w-60">
              <Selection
                placeholder={licenseType.name}
                data={licenseTypes}
                setData={(selected) => {
                  setLicenseType(selected);
                  handleFilterCoursesByType(selected);
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
                <TableHead className="text-center border"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : coursesFiltered.length > 0 ? (
                coursesFiltered.map((course) => (
                  <TableRow
                    key={course.id}
                    className="border hover:bg-gray-100"
                  >
                    <TableCell className="text-center border">
                      {course.id.split("-")[1]}
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
                        onClick={() => handleConfirmDelete(course)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
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
            licenseTypes={licenseTypes.filter((type) => type.id !== "0")}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={deleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
          >
            <AlertDialogContent className="w-fit">
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa khóa học</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa khóa học{" "}
                  <span className="font-bold">
                    {courseToDelete?.id.split("-")[1]}
                  </span>{" "}
                  ({courseToDelete?.licenseType?.type_name})?
                  <br />
                  <br />
                  <span className="text-red-500">
                    Lưu ý: Hành động này không thể hoàn tác và sẽ xóa tất cả dữ
                    liệu liên quan đến khóa học này.
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCourseToDelete(null)}>
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteCourse}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Xóa khóa học
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTable;
