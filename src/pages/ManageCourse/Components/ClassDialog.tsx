import { useState } from "react";
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

interface ClassDialogProps {
  mode: "add" | "edit";
  initialData?: ClassType;
}

export const mockCourseList = [
  { id: "1", name: "Bằng A1" },
  { id: "2", name: "Bằng B2" },
];

export const mockTypeOfClassList = [
  { id: "1", name: "Lý thuyết" },
  { id: "2", name: "Thực hành" },
];

const mockTeacherList = [
  { id: "1", name: "Nguyễn Văn A" },
  { id: "2", name: "Trần Thị B" },
];

const useClassForm = (initialData?: ClassType) => {
  const [name, setName] = useState(initialData?.name || "");
  const [course, setCourse] = useState(initialData?.course.id || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");
  const [type, setType] = useState(initialData?.type.id || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [teacher, setTeacher] = useState(initialData?.teacher || "");
  const [maxStudents, setMaxStudents] = useState(
    initialData?.maxStudents.toString() || "30"
  );

  const hasChanged = () => {
    if (!initialData) return false;
    return (
      name !== initialData.name ||
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
    name,
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
      name,
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
      setName,
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

const ClassDialog = ({ mode, initialData }: ClassDialogProps) => {
  const { fields, setters, hasChanged, getFormData } =
    useClassForm(initialData);

  const handleSubmit = () => {
    const data = getFormData();

    if (mode === "add") {
      console.log("Creating class:", data);
    } else {
      if (!hasChanged()) {
        alert("Bạn chưa thay đổi thông tin nào.");
        return;
      }
      if (!initialData?.id) {
        console.error("Thiếu ID lớp học để cập nhật.");
        return;
      }
      console.log("Updating class:", { ...data, id: initialData.id });
    }
  };

  return (
    <div className="ManageClass-dialog">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            text={mode === "add" ? "Tạo lớp học mới" : "Chỉnh sửa lớp học"}
            isPrimary
          />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[1024px] max-w-none border">
          <AlertDialogHeader>
            <AlertDialogTitle className="ManageClass-title">
              {mode === "add"
                ? "Tạo lớp học mới"
                : `Chỉnh sửa lớp học ${initialData?.id}`}
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
            <Input
              label="* Tên lớp"
              placeholder="Nhập tên lớp"
              onChange={(e) => setters.setName(e.target.value)}
              value={fields.name}
            />

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
                data={mockCourseList}
                placeholder="Chọn khóa học"
                setData={setters.setCourse}
                value={fields.course}
              />
            </div>

            <div className="ManageClass-select">
              <p>* Hình thức lớp học</p>
              <Selection
                data={mockTypeOfClassList}
                placeholder="Chọn hình thức học"
                setData={setters.setType}
                value={fields.type}
              />
            </div>

            <div className="ManageClass-select">
              <p>* Giáo viên phụ trách</p>
              <Selection
                data={mockTeacherList}
                placeholder="Chọn giáo viên"
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
            <AlertDialogCancel>Hủy</AlertDialogCancel>
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
