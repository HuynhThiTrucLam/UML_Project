import axios from "axios";
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
} from "../../../components/ui/alert-dialog";
import { CourseType } from "../../../store/type/Course";
import { LicenseType } from "../../../store/type/Lincense";
import { useAuth } from "../../../store/AuthContext";
import { toast } from "sonner";

interface CourseDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: CourseType;
  licenseTypes?: LicenseType[];
}

interface CourseFormData {
  name: string;
  licenseTypeId: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  price: number;
}

const CourseDialog = ({
  mode,
  open,
  onOpenChange,
  onSuccess,
  initialData,
  licenseTypes = [],
}: CourseDialogProps) => {
  const emptyFormData: CourseFormData = {
    name: "",
    licenseTypeId: "",
    startDate: "",
    endDate: "",
    maxStudents: 0,
    price: 0,
  };
  const { user } = useAuth();
  const [formData, setFormData] = useState<CourseFormData>(emptyFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableLicenseTypes, setAvailableLicenseTypes] = useState<
    LicenseType[]
  >([]);

  useEffect(() => {
    // Reset form when dialog opens
    if (open) {
      if (mode === "edit" && initialData) {
        setFormData({
          name: initialData.name || "",
          licenseTypeId: initialData.licenseType?.id,
          startDate: initialData.startDate || "",
          endDate: initialData.endDate || "",
          maxStudents: initialData.maxStudents || 0,
          price: initialData.price, // Default price since it's not in the CourseType interface
        });
      } else {
        setFormData(emptyFormData);
      }
      setErrors({});
    }

    // Use the provided license types or fetch if not provided
    if (licenseTypes && licenseTypes.length > 0) {
      setAvailableLicenseTypes(licenseTypes);
    } else {
      fetchLicenseTypes();
    }
  }, [open, initialData, mode, licenseTypes]);

  const fetchLicenseTypes = async () => {
    try {
      // This would be replaced with actual API call
      const types: LicenseType[] = [
        { id: "Bằng lái B1", name: "Bằng lái B1" },
        { id: "Bằng lái B2", name: "Bằng lái B2" },
        { id: "Bằng lái C", name: "Bằng lái C" },
      ];
      setAvailableLicenseTypes(types);
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

    if (!formData.licenseTypeId) {
      newErrors.licenseTypeId = "Vui lòng chọn hạng bằng lái";
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
      console.log("first");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        course_name: formData.name,
        license_type_id: formData.licenseTypeId,
        start_date: formData.startDate.split("/").reverse().join("-"),
        end_date: formData.endDate.split("/").reverse().join("-"),
        max_students: formData.maxStudents,
        price: formData.price,
        status: "active",
      };

      if (mode === "create") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/courses/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.status === 201) {
          toast.success(
            `Tạo thành công khoá học mới: ${response.data.course_name}`,
            {
              duration: 5000,
              className: "[&>[data-icon]]:!text-green-500",
            }
          );
        }
      } else if (mode === "edit" && initialData?.id) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/courses/${initialData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success(
            `Cập nhật thành công khoá học: ${response.data.course_name}`,
            {
              duration: 5000,
              className: "[&>[data-icon]]:!text-green-500",
            }
          );
        }
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

  // Don't render anything if dialog is not open
  if (!open) return null;

  return (
    <div className="ManageCourse-dialog">
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="w-fit max-w-none border">
          <AlertDialogHeader>
            <AlertDialogTitle className="ManageCourse-title">
              {mode === "create"
                ? "Tạo khóa học mới"
                : `Chỉnh sửa khóa học ${initialData?.id?.split("-")[1]}`}
              <p className="text-[12px] my-1 font-light text-gray-500">
                {mode === "create"
                  ? "Bắt đầu tạo khóa học! Vui lòng nhập các thông tin chi tiết về khóa học bạn muốn tạo."
                  : "Cập nhật thông tin chi tiết về khóa học."}
              </p>
              <p className="text-[12px] my-1 font-light text-gray-500">
                Các trường dữ liệu có (*) sẽ là các trường bắt buộc.
              </p>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="ManageCourse-form w-max max-w-none max-h-[70vh] overflow-auto space-y-4 w-full">
            <Input
              label="Tên khóa học"
              isForce={true}
              placeholder="Nhập tên khóa học"
              onChange={(e) => handleChange("name", e.target.value)}
              value={formData.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            <div className="ManageCourse-select">
              <p>* Hạng bằng lái</p>
              <Selection
                data={availableLicenseTypes}
                placeholder="Chọn hạng bằng lái"
                setData={(selected) => handleChange("licenseTypeId", selected)}
                value={formData.licenseTypeId}
              />
              {errors.licenseTypeId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.licenseTypeId}
                </p>
              )}
            </div>

            <div className="ManageCourse-time">
              <div className="w-full">
                <Input
                  label="Ngày bắt đầu"
                  isForce={true}
                  placeholder="VD: 01/01/2025"
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  value={formData.startDate}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  label="Ngày kết thúc"
                  isForce={true}
                  placeholder="VD: 01/12/2025"
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  value={formData.endDate}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>

            <div className="ManageCourse-time">
              <div className="w-full">
                <Input
                  label="Số học viên tối đa"
                  isForce={true}
                  type="number"
                  placeholder="Nhập số học viên tối đa"
                  onChange={(e) =>
                    handleChange("maxStudents", parseInt(e.target.value))
                  }
                  value={formData.maxStudents.toString()}
                />
                {errors.maxStudents && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maxStudents}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  label="Giá khóa học (VND)"
                  isForce={true}
                  type="number"
                  placeholder="Nhập giá khóa học"
                  onChange={(e) =>
                    handleChange("price", parseInt(e.target.value))
                  }
                  value={formData.price?.toString()}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="ManageCourse-footer">
            <AlertDialogCancel onClick={() => onOpenChange(false)}>
              Hủy
            </AlertDialogCancel>
            <Button
              text={
                isSubmitting
                  ? "Đang lưu..."
                  : mode === "create"
                  ? "Tạo khóa học"
                  : "Cập nhật khóa học"
              }
              isPrimary
              onClick={handleSubmit}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseDialog;
