import { useState } from "react";
import { PersonalData } from "../../store/type/Student";
import {
  calculateAge,
  isValidDate,
  isValidEmail,
  isValidPhone,
  MIN_AGE_BY_LICENSE_TYPE,
} from "../../utils/validation";
import Button from "../Button/Button";
import ChooseDayForm from "./Features/ChooseDayForm";
import PersonalInforForm from "./Features/PersonalInforForm";
import UploadForm from "./Features/UploadForm";
import "./Form.scss";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../store/AuthContext";
import { decodeJWT } from "../../lib/utils";

const tabs = [
  "Thông tin cá nhân",
  "Upload hồ sơ cá nhân",
  "Chọn lịch học / khám sức khoẻ",
];

const Form = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [personalImgData, setPersonalImgData] = useState({
    avatar: "",
    cardImgFront: "",
    cardImgBack: "",
  });
  const [chooseData, setChooseData] = useState({
    courseId: "",
    healthCheckId: "",
  });

  const handlePersonalDataChange = (newData: Partial<PersonalData>) => {
    setPersonalData((prev) => {
      if (prev) {
        return {
          ...prev,
          ...newData,
        };
      }
      return {
        name: "",
        identityNumber: "",
        address: "",
        phone: "",
        gender: "",
        birthDate: "",
        licenseType: "",
        email: "",
        healthCheckDocURL: "",
      };
    });
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

  // Create a new function for age validation specifically
  const validateAgeRequirement = (
    birthDate: string,
    licenseType: string
  ): { valid: boolean; message?: string } => {
    // Add more comprehensive validation
    if (!birthDate || !licenseType) {
      return {
        valid: false,
        message: "Vui lòng nhập ngày sinh và chọn loại bằng lái",
      };
    }

    // Ensure birth date is in DD/MM/YYYY format
    if (!isValidDate(birthDate)) {
      return {
        valid: false,
        message: "Ngày sinh không hợp lệ! Định dạng hợp lệ: DD/MM/YYYY",
      };
    }

    const age = calculateAge(birthDate);
    const requiredAge = MIN_AGE_BY_LICENSE_TYPE[licenseType];

    if (!requiredAge) {
      return {
        valid: false,
        message: `Không tìm thấy yêu cầu tuổi cho bằng lái hạng ${licenseType}`,
      };
    }

    // For debugging
    console.log(`Validating age for license type ${licenseType}:`);
    console.log(`- Birth date: ${birthDate}`);
    console.log(`- Calculated age: ${age}`);
    console.log(`- Required age: ${requiredAge}`);

    if (age < requiredAge) {
      return {
        valid: false,
        message: `Tuổi của bạn (${age} tuổi) không đủ điều kiện để đăng ký. Yêu cầu tối thiểu là ${requiredAge} tuổi.`,
      };
    }

    return { valid: true };
  };

  const validatePersonalInfo = () => {
    if (!personalData) {
      alert("Vui lòng nhập đầy đủ thông tin cá nhân!");
      return false;
    }

    if (!personalData.name) {
      alert("Họ và tên không được để trống!");
      return false;
    }

    if (!personalData.birthDate) {
      alert("Ngày sinh không được để trống!");
      return false;
    }

    if (!isValidDate(personalData.birthDate)) {
      alert("Ngày sinh không hợp lệ! Định dạng hợp lệ: DD/MM/YYYY");
      return false;
    }

    if (!personalData.licenseType) {
      alert("Vui lòng chọn loại bằng lái!");
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

    // Use the new age validation function
    const ageValidation = validateAgeRequirement(
      personalData.birthDate,
      personalData.licenseType
    );

    if (!ageValidation.valid) {
      alert(ageValidation.message);
      return false;
    }

    return true;
  };

  const validateUploadForm = () => {
    console.log("personalImgData", personalImgData);
    if (
      !personalImgData.avatar ||
      !personalImgData.cardImgFront ||
      !personalImgData.cardImgBack
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

  const handleSummit = async () => {
    try {
      const token = user?.token;
      const decodedToken: any = decodeJWT(token);
      const role = decodedToken?.role;
      console.info(decodedToken);
      var studentInformation = {
        identity_number: personalData?.identityNumber,
        full_name: personalData?.name,
        gender: personalData?.gender,
        phone_number: personalData?.phone,
        date_of_birth: personalData?.birthDate.split("/").reverse().join("-"),
        address: personalData?.address,
        email: personalData?.email,
        license_type_id: personalData?.licenseType,
        identity_image_front: personalImgData.cardImgFront,
        identity_image_back: personalImgData.cardImgBack,
        avatar: personalImgData.avatar,
        course_id: chooseData.courseId,
        health_check_schedule_id: chooseData.healthCheckId,
        role: role ?? "user",
      };
      console.log("studentInformation", studentInformation);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/course_registration/",
        studentInformation,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Đăng ký thành công!", {
          description:
            "Vui lòng kiểm tra email để biết thêm thông tin chi tiết.",
          duration: 5000,
          className: "[&>[data-icon]]:!text-green-500",
        });
      } else {
        alert("Đã xảy ra lỗi trong quá trình gửi thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Đã xảy ra lỗi trong quá trình gửi thông tin. Vui lòng thử lại.");
    }
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
              selectedLicenseId={personalData?.licenseType}
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
