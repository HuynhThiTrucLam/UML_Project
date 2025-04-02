import React, { useState } from "react";
import Input from "../../Input/Input";

import { PersonalData } from "../../../store/type/Student";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const mocktypeOfLicense = [
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
  const [licenseType, setLicenseType] = useState<string>(
    mocktypeOfLicense[0].name
  );

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
          <Select>
            <SelectTrigger className="Form-select-container">
              <SelectValue placeholder={licenseType} />
            </SelectTrigger>
            <SelectContent className="Form-select-container">
              <SelectGroup>
                <SelectLabel>Chọn hạng bằng lái</SelectLabel>
                {mocktypeOfLicense.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.name}
                    onClick={() => {
                      handleChange("licenseType", item.id);
                      setLicenseType(item.name);
                    }}
                    className="text-[12px]"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="Form-select">
          <p>* Giới tính</p>
          <Select>
            <SelectTrigger className="Form-select-container">
              <SelectValue placeholder={gender} />
            </SelectTrigger>
            <SelectContent className="Form-select-container">
              <SelectGroup>
                <SelectLabel>Giới tính</SelectLabel>
                {mockGender.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.name}
                    onClick={() => {
                      handleChange("gender", item.id);
                      setGender(item.name);
                    }}
                    className="text-[12px]"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
