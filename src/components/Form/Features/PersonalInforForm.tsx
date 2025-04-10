import React, { useState } from "react";
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
  formData: PersonalData;
  onFormDataChange: (data: Partial<PersonalData>) => void;
}

const PersonalInforForm: React.FC<PersonalInforFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onFormDataChange({ [field]: value });
  };
  const [gender, setGender] = useState<string>(mockGender[0].name);
  const [licenseType, setLicenseType] = useState<string>(typeOfLicense[0].name);

  return (
    <>
      <div className="Form-personal">
        <Input
          label="Họ và tên"
          placeholder="VD: Nguyễn Văn A"
          value={formData.name}
          onChange={(e: any) => handleChange("name", e.target.value)}
          isForce={true}
        />
        <div className="Form-select">
          <p>* Hạng bằng lái muốn thi</p>
          <Selection
            placeholder={licenseType}
            data={typeOfLicense}
            setData={() => {
              setLicenseType;
            }}
          ></Selection>
        </div>
        <div className="Form-select">
          <p>* Giới tính</p>
          <Selection
            placeholder={gender}
            data={mockGender}
            setData={setGender}
          ></Selection>
        </div>
        <Input
          label="Năm sinh"
          placeholder="DD/MM/YYYY"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          isForce={true}
        />
        <Input
          label="Số điện thoại"
          placeholder="VD: 0123456789"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          isForce={true}
        />
        <Input
          label="Địa chỉ email"
          placeholder="VD: nguyenVanA@gmail.com"
          value={formData.email ? formData.email : ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
    </>
  );
};

export default PersonalInforForm;
