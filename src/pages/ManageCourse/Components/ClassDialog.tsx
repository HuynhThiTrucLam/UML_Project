import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Selection from "../../../components/Select/Select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { ClassType, TypeOfClass } from "../../../store/type/Class";
import "./ManageClass.scss";
import axios from "axios";
import { useAuth } from "../../../store/AuthContext";
import { toast } from "sonner";

interface ClassDialogProps {
  mode: "add" | "edit";
  initialData?: ClassType;
}

// Fallback mock data in case API fails
export const mockCourseList = [
  { id: "1", name: "Bằng A1" },
  { id: "2", name: "Bằng B2" },
];

export const mockTypeOfClassList = [
  { id: "theory", name: "Lý thuyết" },
  { id: "practice", name: "Thực hành" },
];

export const mockTeacherList = [
  { id: "1", name: "Nguyễn Văn A" },
  { id: "2", name: "Trần Thị B" },
];

const useClassForm = (initialData?: ClassType) => {
  const [course, setCourse] = useState(initialData?.course.id || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");
  const [type, setType] = useState(initialData?.type.id || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [teacher, setTeacher] = useState(initialData?.teacher || "");
  const [maxStudents, setMaxStudents] = useState(
    initialData?.maxStudents?.toString() || "30"
  );

  const hasChanged = () => {
    if (!initialData) return false;
    return (
      course !== initialData.course.id ||
      date !== initialData.date ||
      startTime !== initialData.startTime ||
      endTime !== initialData.endTime ||
      type !== initialData.type.id ||
      location !== initialData.location ||
      teacher !== initialData.teacher ||
      parseInt(maxStudents) !== initialData.maxStudents
    );
  };

  const getFormData = () => ({
    course,
    date,
    startTime,
    endTime,
    type,
    location,
    teacher,
    maxStudents: parseInt(maxStudents),
  });

  return {
    fields: {
      course,
      date,
      startTime,
      endTime,
      type,
      location,
      teacher,
      maxStudents,
    },
    setters: {
      setCourse,
      setDate,
      setStartTime,
      setEndTime,
      setType,
      setLocation,
      setTeacher,
      setMaxStudents,
    },
    hasChanged,
    getFormData,
  };
};
const formatTimeToISO = (dateStr: string, timeStr: string) => {
  const [year, month, day] = dateStr.split("/").reverse();
  // Ensure month and day are zero-padded
  const paddedMonth = month.padStart(2, "0");
  const paddedDay = day.padStart(2, "0");
  // Create ISO format string
  return `${year}-${paddedMonth}-${paddedDay}T${timeStr}:00`;
};
const ClassDialog = ({ mode, initialData }: ClassDialogProps) => {
  const { fields, setters, hasChanged, getFormData } =
    useClassForm(initialData);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // State for API data
  const [courseList, setCourseList] = useState<{ id: string; name: string }[]>(
    []
  );
  const [typeOfClassList, setTypeOfClassList] =
    useState<{ id: string; name: string }[]>(mockTypeOfClassList);
  const [teacherList, setTeacherList] = useState<
    { id: string; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState({
    courses: false,
    classTypes: false,
    teachers: false,
  });

  // Fetch courses from API
  const fetchCourses = async () => {
    setIsLoading((prev) => ({ ...prev, courses: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses/?skip=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const formattedCourses = response.data.items.map((item: any) => ({
        id: item.id,
        name: item.course_name,
      }));

      setCourseList(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourseList(mockCourseList);
      toast.error(
        "Không thể tải danh sách khóa học. Đang sử dụng dữ liệu mặc định.",
        {
          duration: 3000,
        }
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, courses: false }));
    }
  };

  // Fetch teachers from API
  const fetchTeachers = async () => {
    setIsLoading((prev) => ({ ...prev, teachers: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/instructor/?skip=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const formattedTeachers = response.data.map((item: any) => ({
        id: item.id,
        name: `${item.user.user_name}`,
      }));

      setTeacherList(formattedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeacherList(mockTeacherList);
      toast.error(
        "Không thể tải danh sách giáo viên. Đang sử dụng dữ liệu mặc định.",
        {
          duration: 3000,
        }
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, teachers: false }));
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const handleSubmit = async () => {
    const data = getFormData();

    if (mode === "add") {
      try {
        // Convert startTime to ISO format

        const startTimeISO = formatTimeToISO(data.date, data.startTime);
        const endTimeISO = formatTimeToISO(data.date, data.endTime);
        console.log("startTime", startTimeISO);
        console.log("endTime", startTimeISO);
        const payload = {
          course_id: data.course,
          start_time: startTimeISO,
          end_time: endTimeISO,
          type: data.type,
          location: data.location,
          instructor_id: data.teacher,
          max_students: data.maxStudents,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/schedule/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Tạo lớp học mới thành công!", {
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error creating class:", error);
        toast.error("Không thể tạo lớp học. Vui lòng thử lại sau.", {
          duration: 3000,
        });
      }
    } else {
      if (!hasChanged()) {
        toast.info("Bạn chưa thay đổi thông tin nào.", {
          duration: 3000,
        });
        return;
      }

      if (!initialData?.id) {
        toast.error("Thiếu ID lớp học để cập nhật.", {
          duration: 3000,
        });
        return;
      }

      try {
        const startTimeISO = formatTimeToISO(data.date, data.startTime);
        const endTimeISO = formatTimeToISO(data.date, data.endTime);
        console.log("startTime", startTimeISO);
        console.log("endTime", startTimeISO);
        const payload = {
          course_id: data.course,
          start_time: startTimeISO,
          endTimeISO: endTimeISO,
          type: data.type,
          location: data.location,
          instructor_id: data.teacher,
          max_students: data.maxStudents,
        };

        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/schedule/${initialData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Cập nhật lớp học thành công!", {
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating class:", error);
        toast.error("Không thể cập nhật lớp học. Vui lòng thử lại sau.", {
          duration: 3000,
        });
      }
    }
    setOpen(false);
  };

  return (
    <div className="ManageClass-dialog">
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button
            text={mode === "add" ? "Tạo lớp học mới" : "Chỉnh sửa lớp học"}
            isPrimary
            onClick={() => setOpen(true)}
          />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[1024px] max-w-none border">
          <AlertDialogHeader>
            <AlertDialogTitle className="ManageClass-title">
              {mode === "add"
                ? "Tạo lớp học mới"
                : `Chỉnh sửa lớp học ${initialData?.id?.split("-")[1]}`}
              <p className="text-[12px] my-1 font-light text-gray-500">
                Bắt đầu tạo lớp học! Vui lòng nhập các thông tin chi tiết về lớp
                học bạn muốn tạo.
              </p>
              <p className="text-[12px] my-1 font-light text-gray-500">
                Các trường dữ liệu có (*) sẽ là các trường bắt buộc.
              </p>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="ManageClass-form w-max max-w-none max-h-[70vh] overflow-auto space-y-4">
            <div className="ManageClass-time">
              <Input
                label="* Giờ bắt đầu"
                placeholder="VD: 08:00"
                onChange={(e) => setters.setStartTime(e.target.value)}
                value={fields.startTime}
              />
              <Input
                label="* Giờ kết thúc"
                placeholder="VD: 08:00"
                onChange={(e) => setters.setEndTime(e.target.value)}
                value={fields.endTime}
              />
              <Input
                label="* Ngày học"
                placeholder="VD:01/01/2025"
                onChange={(e) => setters.setDate(e.target.value)}
                value={fields.date}
              />
            </div>

            <div className="ManageClass-select">
              <p>* Lớp thuộc khóa học</p>
              <Selection
                data={courseList}
                placeholder={
                  isLoading.courses ? "Đang tải..." : "Chọn khóa học"
                }
                setData={setters.setCourse}
                value={fields.course}
              />
            </div>

            <div className="ManageClass-select">
              <p>* Hình thức lớp học</p>
              <Selection
                data={typeOfClassList}
                placeholder={
                  isLoading.classTypes ? "Đang tải..." : "Chọn hình thức học"
                }
                setData={setters.setType}
                value={fields.type}
              />
            </div>

            <div className="ManageClass-select">
              <p>* Giáo viên phụ trách</p>
              <Selection
                data={teacherList}
                placeholder={
                  isLoading.teachers ? "Đang tải..." : "Chọn giáo viên"
                }
                setData={setters.setTeacher}
                value={fields.teacher}
              />
            </div>

            <Input
              label="Số học viên tối đa"
              type="number"
              placeholder="Nhập số học viên"
              onChange={(e) => setters.setMaxStudents(e.target.value)}
              value={fields.maxStudents}
            />

            <Input
              label="* Địa điểm"
              placeholder="Nhập địa điểm"
              onChange={(e) => setters.setLocation(e.target.value)}
              value={fields.location}
            />
          </AlertDialogDescription>

          <AlertDialogFooter className="ManageClass-footer">
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Hủy
            </AlertDialogCancel>
            <Button
              text={mode === "add" ? "Tạo lớp học" : "Cập nhật lớp học"}
              isPrimary
              onClick={handleSubmit}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassDialog;
