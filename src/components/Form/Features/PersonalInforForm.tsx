import React, { useEffect, useState } from "react";
import Input from "../../Input/Input";

import { LicenseType } from "../../../store/type/Lincense";
import { PersonalData } from "../../../store/type/Student";
import Selection from "../../Select/Select";

export const typeOfLicense: LicenseType[] = [
  { id: "0", name: "Tất cả" },
  { id: "1", name: "Bằng lái A1" },
  { id: "2", name: "Bằng lái A2" },
  { id: "3", name: "Bằng lái B1" },
  { id: "4", name: "Bằng lái B2" },
  { id: "5", name: "Bằng lái C" },
];

export const mockGender = [
  { id: "1", name: "Nam" },
  { id: "2", name: "Nữ" },
  { id: "3", name: "Khác" },
];

interface PersonalInforFormProps {
  formData?: PersonalData | null;
  onFormDataChange: (data: Partial<PersonalData>) => void;
}

const PersonalInforForm: React.FC<PersonalInforFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const handleChange = (field: keyof PersonalData, value: string) => {
    if (formData) {
      onFormDataChange({ ...formData, [field]: value });
    } else {
      onFormDataChange({ [field]: value });
    }
  };
  const [gender, setGender] = useState<string>(mockGender[0].id);
  const [licenseTypeList, setLicenseTypeList] = useState<LicenseType[]>([]);
  const [licenseType, setLicenseType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRetieveListLicense = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/license_type/?skip=0&limit=100"
      );
      const data = await response.json();
      const licenseTypes = data.items.map((item: any) => ({
        id: item.id,
        name: item.type_name,
      }));
      setLicenseTypeList(licenseTypes);
      console.info(licenseTypes);
      setLicenseType(licenseTypes[0].id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching license types:", error);
    }
  };

  useEffect(() => {
    handleRetieveListLicense();
  }, []);

  useEffect(() => {
    if (gender) {
      handleChange("gender", gender);
    }
  }, [gender]);

  useEffect(() => {
    if (licenseType) {
      handleChange("licenseType", licenseType);
    }
  }, [licenseType]);
  return (
    <>
      <div className="Form-personal">
        <Input
          label="Họ và tên"
          placeholder="VD: Nguyễn Văn A"
          value={formData?.name}
          onChange={(e: any) => handleChange("name", e.target.value)}
          isForce={true}
        />
        <Input
          label="Số CMND/CCCD"
          placeholder="VD: 0000 0000 0000"
          value={formData?.identityNumber}
          onChange={(e: any) => handleChange("identityNumber", e.target.value)}
          isForce={true}
        />
        <div className="Form-select">
          <Selection
            title="Hạng bằng lái muốn thi"
            placeholder={"Vui lòng chọn hạng bằng lái"}
            data={licenseTypeList}
            setData={setLicenseType}
            value={licenseType}
          ></Selection>
        </div>
        <div className="Form-select">
          <Selection
            title="Giới tính"
            placeholder={"Vui lòng chọn giới tính"}
            data={mockGender}
            setData={setGender}
            value={gender}
          ></Selection>
        </div>
        <Input
          label="Địa chỉ"
          placeholder="VD: 123 Đường ABC, Phường XYZ, Quận 1"
          value={formData?.address}
          onChange={(e: any) => handleChange("address", e.target.value)}
          isForce={true}
        />
        <Input
          label="Năm sinh"
          placeholder="DD/MM/YYYY"
          value={formData?.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          isForce={true}
        />
        <Input
          label="Số điện thoại"
          placeholder="VD: 0123456789"
          value={formData?.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          isForce={true}
        />
        <Input
          label="Địa chỉ email"
          placeholder="VD: nguyenVanA@gmail.com"
          value={formData?.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
    </>
  );
};

export default PersonalInforForm;
