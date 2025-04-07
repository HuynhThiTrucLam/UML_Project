import { useState } from "react";
import { PersonalData } from "../../store/type/Student";
import Button from "../Button/Button";
import ChooseDayForm from "./Features/ChooseDayForm";
import PersonalInforForm, {
  mockGender,
  mocktypeOfLicense,
} from "./Features/PersonalInforForm";
import UploadForm from "./Features/UploadForm";
import "./Form.scss";
import {
  isValidPhone,
  isValidEmail,
  isValidDate,
} from "../../utils/validation";

const tabs = [
  "Thông tin cá nhân",
  "Upload hồ sơ cá nhân",
  "Chọn lịch học / khám sức khoẻ",
];

const Form = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    phone: "",
    gender: mockGender[0].id,
    birthDate: "",
    licenseType: mocktypeOfLicense[0].id,
    email: "",
  });
  const [personalImgData, setPersonalImgData] = useState({
    avatar: "",
    frontImg: "",
    backImg: "",
  });
  const [chooseData, setChooseData] = useState({
    courseId: "",
    healthCheckId: "",
  });

  const handlePersonalDataChange = (newData: Partial<PersonalData>) => {
    setPersonalData((prev) => ({
      ...prev,
      ...newData,
    }));
  };
  const handlePersonalImgDataChange = (newData: Partial<any>) => {
    setPersonalImgData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleChooseDataChange = (newData: Partial<typeof chooseData>) => {
    setChooseData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const validatePersonalInfo = () => {
    if (!personalData.name) {
      alert("Họ và tên không được để trống!");
      return false;
    }
    if (!isValidDate(personalData.birthDate)) {
      alert("Ngày sinh không hợp lệ! Định dạng hợp lệ: DD/MM/YYYY");
      return false;
    }
    if (!isValidPhone(personalData.phone)) {
      alert("Số điện thoại không hợp lệ!");
      return false;
    }
    if (personalData.email && !isValidEmail(personalData.email)) {
      alert("Email không hợp lệ!");
      return false;
    }

    return true;
  };
  const validateUploadForm = () => {
    if (
      !personalImgData.avatar ||
      !personalImgData.frontImg ||
      !personalImgData.backImg
    ) {
      alert("Vui lòng tải lên đầy đủ các hình ảnh được yêu cầu");
      return false;
    }
    return true;
  };

  const validateChooseForm = () => {
    if (!chooseData.courseId || !chooseData.healthCheckId) {
      alert("Vui lòng chọn khóa học và lịch khám sức khỏe!");
      return false;
    }
    return true;
  };

  const handleSummit = () => {
    var studentInformation = {
      personalData: personalData,
      personalImgData: personalImgData,
      chooseData: chooseData,
    };
    console.log(studentInformation);
  };

  return (
    <div className="Form">
      <div className="Form-container">
        <div className="Form-heading">
          <h1>Đăng ký thi ngay</h1>
          <div className="flex flex-col gap-1">
            <p>
              Vui lòng điền đầy đủ thông tin vào biểu mẫu dưới đây để hoàn tất
              đăng ký thi bằng lái xe.
            </p>
            <p>
              Các trường có dấu (*) là bắt buộc. Đảm bảo rằng thông tin cung cấp
              chính xác để tránh sai sót trong quá trình xét duyệt và cấp bằng.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="Form-tab">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`Form-tab-item ${
                index === activeTab ? "isActive" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <p>{tab}</p>
              <div className="Form-tab-item-line"></div>
            </div>
          ))}
        </div>

        <div className="Form-wrap">
          {/* Form Content */}
          <form className="Form-input"></form>
          {activeTab === 0 && (
            <PersonalInforForm
              formData={personalData}
              onFormDataChange={handlePersonalDataChange}
            />
          )}
          {activeTab === 1 && (
            <UploadForm onFormDataChange={handlePersonalImgDataChange} />
          )}
          {activeTab === 2 && (
            <ChooseDayForm
              formData={chooseData}
              onFormDataChange={handleChooseDataChange}
            />
          )}
          {/* Button điều hướng */}
          <div className="Form-actions">
            {activeTab > 0 && (
              <Button
                text="Quay lại"
                onClick={() => setActiveTab(activeTab - 1)}
              />
            )}
            {activeTab < tabs.length - 1 ? (
              <Button
                text="Tiếp tục"
                isPrimary={true}
                onClick={() => {
                  if (activeTab === 0 && !validatePersonalInfo()) return;
                  if (activeTab === 1 && !validateUploadForm()) return;
                  setActiveTab(activeTab + 1);
                }}
              />
            ) : (
              <Button
                text="Hoàn tất đăng ký"
                isPrimary={true}
                onClick={() => {
                  if (!validateChooseForm()) return;
                  handleSummit();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
