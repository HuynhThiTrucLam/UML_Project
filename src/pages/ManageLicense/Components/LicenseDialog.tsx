import { useState } from "react";
import Button from "../../../components/Button/Button";
import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
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

interface LicenseDialogProps {
  mode: "add" | "edit";
  initialData?: License;
}

const useLicenseForm = (initialData?: License) => {
  const [licenseCode, setLicenseCode] = useState(initialData?.code || "");
  const [licenseType, setLicenseType] = useState<string>(
    initialData?.typeOfLicense?.id?.toString() || ""
  );
  const [issueDate, setIssueDate] = useState(
    initialData?.issueDate?.split("T")[0] || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    initialData?.expiryDate?.split("T")[0] || ""
  );

  const handleSetType = (value: any) => {
    if (value && typeof value === "object" && value.id) {
      setLicenseType(value.id);
    } else {
      setLicenseType(value);
    }
  };

  const hasChanged = (): boolean => {
    if (!initialData) return false;
    return (
      licenseCode !== initialData.id ||
      licenseType !== initialData.typeOfLicense.id ||
      issueDate !== initialData.issueDate.split("T")[0] ||
      expiryDate !== initialData.expiryDate.split("T")[0]
    );
  };

  const getFormData = () => ({
    code: licenseCode,
    type: licenseType,
    issueDate,
    expiryDate,
  });

  return {
    fields: {
      licenseCode,
      licenseType,
      issueDate,
      expiryDate,
    },
    setters: {
      setLicenseCode,
      setLicenseType: handleSetType,
      setIssueDate,
      setExpiryDate,
    },
    hasChanged,
    getFormData,
  };
};

const LicenseDialog = ({ mode, initialData }: LicenseDialogProps) => {
  const { fields, setters, hasChanged, getFormData } =
    useLicenseForm(initialData);

  const handleSubmit = () => {
    const data = getFormData();

    if (mode === "add") {
      console.log("Creating license:", data);
    } else {
      if (!hasChanged()) {
        alert("Bạn chưa thay đổi thông tin nào.");
        return;
      }
      if (!initialData?.id) {
        console.error("Missing license ID for editing.");
        return;
      }
      console.log("Updating license:", { ...data, id: initialData.id });
    }
  };

  return (
    <div className="ManageLicense-dialog">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            text={mode === "add" ? "Tạo giấy phép mới" : "Sửa"}
            isPrimary
          />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[1024px] max-w-none border">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {mode === "add"
                ? "Điền thông tin giấy phép"
                : `Chỉnh sửa giấy phép ${initialData?.code}`}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="ManageLicense-form w-max max-w-none max-h-[70vh] overflow-auto">
            <Input
              label="Mã giấy phép"
              placeholder="Nhập mã giấy phép"
              onChange={(e) => setters.setLicenseCode(e.target.value)}
              value={fields.licenseCode}
            />

            <div className="ManageLicense-select">
              <p>Loại bằng lái</p>
              <Selection
                data={typeOfLicense}
                placeholder="Chọn loại bằng"
                setData={setters.setLicenseType}
                value={fields.licenseType}
              />
            </div>

            <Input
              label="Ngày cấp"
              placeholder="YYYY-MM-DD"
              onChange={(e) => setters.setIssueDate(e.target.value)}
              value={fields.issueDate}
            />

            <Input
              label="Ngày hết hạn"
              placeholder="YYYY-MM-DD"
              onChange={(e) => setters.setExpiryDate(e.target.value)}
              value={fields.expiryDate}
            />
          </AlertDialogDescription>

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
