import React from "react";
import Input from "../Input/Input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const mocktypeOfLicense = [
  { id: 1, name: "Bằng lái A1" },
  { id: 2, name: "Bằng lái A2" },
  { id: 3, name: "Bằng lái B1" },
  { id: 4, name: "Bằng lái B2" },
  { id: 5, name: "Bằng lái C" },
];
export const mockGender = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Nữ" },
  { id: 3, name: "Khác" },
];

const PersonalInforForm = () => {
  const [typeLicense, setTypeLicense] = React.useState(mocktypeOfLicense[0]);
  return (
    <div className="Form-personal">
      <Input
        label="Họ và tên"
        placeholder="VD: Nguyễn Văn A"
        isForce={true}
      ></Input>
      <div className="Form-select">
        <p>* Hạng bằng lái muốn thi</p>
        <Select>
          <SelectTrigger className="Form-select-container">
            <SelectValue placeholder={typeLicense.name} />
          </SelectTrigger>
          <SelectContent className="Form-select-container">
            <SelectGroup>
              <SelectLabel>Chọn hạng bằng lái</SelectLabel>
              {mocktypeOfLicense.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.name}
                  onClick={() => setTypeLicense(item)}
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
            <SelectValue placeholder={mockGender[0].name} />
          </SelectTrigger>
          <SelectContent className="Form-select-container">
            <SelectGroup>
              <SelectLabel>Giới tính</SelectLabel>
              {mockGender.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.name}
                  onClick={() => setTypeLicense(item)}
                  className="text-[12px]"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Input label="Năm sinh" placeholder="DD/MM/YYYY" isForce={true}></Input>
      <Input
        label="Số điện thoại"
        placeholder="VD: 0123456789"
        isForce={true}
      ></Input>
      <Input
        label="Địa chỉ email"
        placeholder="VD: nguyenVanA@gmail.com"
      ></Input>
    </div>
  );
};

export default PersonalInforForm;
