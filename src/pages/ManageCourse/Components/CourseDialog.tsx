import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Selection from "../../../components/Select/Select";
import { Button as ButtonS } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import { CourseType } from "../../../store/type/Course";
import { LicenseType } from "../../../store/type/Lincense";

interface CourseDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: CourseType;
}

interface CourseFormData {
  name: string;
  licenseType: {
    id: string;
    name: string;
  } | null;
  startDate: Date;
  endDate: Date;
  maxStudents: number;
  price: number;
}

const CourseDialog = ({
  mode,
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CourseDialogProps) => {
  const emptyFormData: CourseFormData = {
    name: "",
    licenseType: null,
    startDate: new Date(),
    endDate: new Date(),
    maxStudents: 0,
    price: 0,
  };

  const [formData, setFormData] = useState<CourseFormData>(emptyFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);

  useEffect(() => {
    // Reset form when dialog opens
    if (open) {
      if (mode === "edit" && initialData) {
        const licenseTypeObj = {
          id: initialData.licenseType?.id || "",
          name: initialData.licenseType?.type_name || "",
        };

        setFormData({
          name: initialData.name || "",
          licenseType: licenseTypeObj,
          startDate: initialData.startDate || new Date(),
          endDate: initialData.endDate || new Date(),
          maxStudents: initialData.maxStudents || 0,
          price: 0, // Default price since it's not in the CourseType interface
        });
      } else {
        setFormData(emptyFormData);
      }
      setErrors({});
    }

    // Fetch license types if needed
    fetchLicenseTypes();
  }, [open, initialData, mode]);

  const fetchLicenseTypes = async () => {
    try {
      // This would be replaced with actual API call
      const types: LicenseType[] = [
        { id: "Bằng lái B1", name: "Bằng lái B1" },
        { id: "Bằng lái B2", name: "Bằng lái B2" },
        { id: "Bằng lái C", name: "Bằng lái C" },
      ];
      setLicenseTypes(types);
    } catch (error) {
      console.error("Error fetching license types:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên khóa học không được để trống";
    }

    if (!formData.licenseType) {
      newErrors.licenseType = "Vui lòng chọn hạng bằng lái";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Ngày bắt đầu không được để trống";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Ngày kết thúc không được để trống";
    } else if (
      formData.startDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    if (!formData.maxStudents || formData.maxStudents <= 0) {
      newErrors.maxStudents = "Số học viên tối đa phải lớn hơn 0";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Giá khóa học phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        course_name: formData.name,
        license_type: formData.licenseType
          ? {
              id: formData.licenseType.id,
              type_name: formData.licenseType.name,
            }
          : null,
        start_date: formData.startDate,
        end_date: formData.endDate,
        max_students: formData.maxStudents,
        price: formData.price,
      };

      if (mode === "create") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/courses/`,
          payload
        );
      } else if (mode === "edit" && initialData?.id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/courses/${initialData.id}`,
          payload
        );
      }

      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom input styling
  const inputStyles =
    "border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200";
  const errorInputStyles =
    "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white rounded-lg shadow-lg">
        <DialogHeader className="px-6 py-4 bg-blue-50 border-b">
          <DialogTitle className="text-xl font-semibold text-blue-800">
            {mode === "create" ? "Thêm khóa học mới" : "Chỉnh sửa khóa học"}
          </DialogTitle>
          <p className="text-sm text-blue-600 mt-1">
            {mode === "create"
              ? "Điền thông tin để tạo khóa học mới"
              : "Cập nhật thông tin khóa học"}
          </p>
        </DialogHeader>

        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <div className="space-y-5">
            {/* Course Basic Information */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-700">
                Thông tin cơ bản
              </h3>

              <div className="grid gap-3">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Tên khóa học <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Bằng lái xe máy A1"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={cn(
                      inputStyles,
                      errors.name ? errorInputStyles : ""
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Hạng bằng lái <span className="text-red-500">*</span>
                  </Label>
                  <Selection
                    title={null}
                    placeholder="Chọn hạng bằng lái"
                    data={licenseTypes}
                    setData={(selected) =>
                      handleChange("licenseType", selected)
                    }
                  />
                  {errors.licenseType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.licenseType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="space-y-4 pt-2">
              <h3 className="text-md font-medium text-gray-700">Lịch trình</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <Label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className={cn(
                      inputStyles,
                      errors.startDate ? errorInputStyles : ""
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className={cn(
                      inputStyles,
                      errors.endDate ? errorInputStyles : ""
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endDate}
                    </p>
                  )}
                </div> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonS
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {formData.startDate ? (
                        formData.endDate ? (
                          <>
                            {format(formData.startDate, "LLL dd, y")} -{" "}
                            {format(formData.endDate, "LLL dd, y")}
                          </>
                        ) : (
                          format(formData.startDate, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </ButtonS>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={formData.startDate}
                      selected={{
                        from: formData.startDate,
                        to: formData.endDate,
                      }}
                      onSelect={(range) => {
                        handleChange("startDate", range?.from);
                        handleChange("endDate", range?.to);
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Other Information */}
            <div className="space-y-4 pt-2">
              <h3 className="text-md font-medium text-gray-700">
                Thông tin khác
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="maxStudents"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Số học viên tối đa <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    min="1"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      handleChange("maxStudents", parseInt(e.target.value))
                    }
                    className={cn(
                      inputStyles,
                      errors.maxStudents ? errorInputStyles : ""
                    )}
                  />
                  {errors.maxStudents && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.maxStudents}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Giá (VND) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={(e) =>
                      handleChange("price", parseInt(e.target.value))
                    }
                    className={cn(
                      inputStyles,
                      errors.price ? errorInputStyles : ""
                    )}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
          <Button
            text="Hủy"
            isPrimary={false}
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          />
          <Button
            text={
              isSubmitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Tạo mới"
                : "Lưu thay đổi"
            }
            isPrimary
            onClick={handleSubmit}
            className={cn(
              "px-4 py-2 rounded-md transition-all",
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90"
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
