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
import { License } from "../../../store/type/Lincense";
import axios from "axios";
import { toast } from "sonner";
import dayjs from "dayjs";

interface LicenseDialogProps {
  mode: "add" | "edit";
  initialData?: License;
  onUpdate?: () => void;
}

const licenseStatusOptions = [
  { id: "active", name: "Active" },
  { id: "expired", name: "Expired" },
  { id: "suspended", name: "Suspended" },
  { id: "revoked", name: "Revoked" },
  { id: "pending", name: "Pending" },
];

const useLicenseForm = (initialData?: License) => {
  const [licenseNumber, setLicenseNumber] = useState(
    initialData?.licenseNumber || ""
  );
  const [licenseType, setLicenseType] = useState<string>(
    initialData?.typeOfLicense?.id?.toString() || ""
  );
  const [studentId, setStudentId] = useState(initialData?.studentId || "");
  const [status, setStatus] = useState(initialData?.status || "");
  const [issueDate, setIssueDate] = useState(
    initialData?.createdAt?.split("T")[0] || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    initialData?.expirationDate?.split("T")[0] || ""
  );
  const [courseId, setCourseId] = useState(initialData?.courseId || "");
  const [licenseTypes, setLicenseTypes] = useState<any[]>([]);

  useEffect(() => {
    // Fetch license types
    const fetchLicenseTypes = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/api/license_type/?skip=0&limit=100"
        );
        const data = response.data.items?.map((item: any) => ({
          id: item.id,
          name: item.type_name,
        }));
        setLicenseTypes(data);
      } catch (err) {
        console.error("Error fetching license types:", err);
        // Mock data for development
        setLicenseTypes([
          { id: "d64eb185-9581-4de8-b041-dd7a06449cf1", name: "A1" },
          { id: "abc123", name: "A2" },
          { id: "def456", name: "B1" },
          { id: "ghi789", name: "B2" },
        ]);
      }
    };

    fetchLicenseTypes();
  }, []);

  const handleSetType = (value: any) => {
    if (value && typeof value === "object" && value.id) {
      setLicenseType(value.id);
    } else {
      setLicenseType(value);
    }
  };

  const handleSetStatus = (value: any) => {
    if (value && typeof value === "object" && value.id) {
      setStatus(value.id);
    } else {
      setStatus(value);
    }
  };

  const hasChanged = (): boolean => {
    if (!initialData) return true;
    return (
      licenseNumber !== initialData.licenseNumber ||
      licenseType !== initialData.typeOfLicense.id ||
      studentId !== initialData.studentId ||
      status !== initialData.status ||
      issueDate !== initialData.createdAt.split("T")[0] ||
      expiryDate !== initialData.expirationDate.split("T")[0] ||
      courseId !== initialData.courseId
    );
  };

  const getFormData = () => ({
    licenseNumber,
    licenseTypeId: licenseType,
    studentId,
    status,
    createdAt: issueDate,
    expirationDate: expiryDate,
    courseId,
  });

  return {
    fields: {
      licenseNumber,
      licenseType,
      studentId,
      status,
      issueDate,
      expiryDate,
      courseId,
    },
    setters: {
      setLicenseNumber,
      setLicenseType: handleSetType,
      setStudentId,
      setStatus: handleSetStatus,
      setIssueDate,
      setExpiryDate,
      setCourseId,
    },
    licenseTypes,
    hasChanged,
    getFormData,
  };
};

const LicenseDialog = ({ mode, initialData, onUpdate }: LicenseDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fields, setters, licenseTypes, hasChanged, getFormData } =
    useLicenseForm(initialData);
  const handleSubmit = async () => {
    if (!hasChanged()) {
      toast.warning("Bạn chưa thay đổi thông tin nào.");
      return;
    }

    const data = getFormData();

    try {
      if (mode === "add") {
        await axios.post(import.meta.env.VITE_API_URL + "/api/licenses", data);
        toast.success("Tạo giấy phép thành công");
      } else {
        if (!initialData?.id) {
          throw new Error("Missing license ID for editing");
        }
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/licenses/${initialData.id}`,
          {
            license_number: data.licenseNumber,
            license_type_id: data.licenseTypeId,
            expiration_date: dayjs(
              data.expirationDate.split("/").reverse().join("-")
            ),
            status: data.status,
          }
        );
        toast.success("Cập nhật giấy phép thành công");
      }

      setIsOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error saving license:", error);
      toast.error("Có lỗi xảy ra khi lưu giấy phép");
    }
  };

  return (
    <div className="ManageLicense-dialog">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            text={mode === "add" ? "Tạo giấy phép mới" : "Sửa"}
            isPrimary={mode === "add"}
          />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[1024px] max-w-none border">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {mode === "add"
                ? "Điền thông tin giấy phép"
                : `Chỉnh sửa giấy phép ${initialData?.licenseNumber}`}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="ManageLicense-form grid grid-cols-2 w-full gap-4 max-w-none max-h-[70vh] overflow-auto">
            <div>
              <Input
                label="Mã giấy phép"
                className="[&>label]:!text-xs [&>div>input]:!mt-0"
                placeholder="Nhập mã giấy phép"
                onChange={(e) => setters.setLicenseNumber(e.target.value)}
                disabled
                value={fields.licenseNumber}
              />
            </div>

            <div className="ManageLicense-select">
              <Selection
                title={"Loại bằng lái"}
                data={licenseTypes}
                placeholder="Chọn loại bằng"
                setData={setters.setLicenseType}
                value={fields.licenseType}
              />
            </div>

            <div>
              <Input
                label="Mã học viên"
                placeholder="Nhập mã học viên"
                className="[&>label]:!text-xs [&>div>input]:!mt-0"
                onChange={(e) => setters.setStudentId(e.target.value)}
                value={fields.studentId.split("-")[1]}
                disabled
              />
            </div>

            <div className="ManageLicense-select">
              <Selection
                title={"Trạng thái"}
                data={licenseStatusOptions}
                placeholder="Chọn trạng thái"
                setData={setters.setStatus}
                value={fields.status}
              />
            </div>

            <div>
              <Input
                label="Ngày cấp"
                placeholder="YYYY-MM-DD"
                onChange={(e) => setters.setIssueDate(e.target.value)}
                disabled
                value={fields.issueDate}
              />
            </div>

            <div>
              <Input
                label="Ngày hết hạn"
                placeholder="YYYY-MM-DD"
                onChange={(e) => setters.setExpiryDate(e.target.value)}
                value={fields.expiryDate}
              />
            </div>

            <div>
              <Input
                label="Mã khóa học"
                placeholder="Nhập mã khóa học"
                onChange={(e) => setters.setCourseId(e.target.value)}
                disabled
                value={fields.courseId.split("-")[1]}
              />
            </div>
          </div>

          <AlertDialogFooter className="ManageLicense-footer">
            <AlertDialogCancel>Thoát</AlertDialogCancel>
            <Button
              text={mode === "add" ? "Tạo giấy phép" : "Cập nhật giấy phép"}
              isPrimary
              onClick={handleSubmit}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LicenseDialog;
