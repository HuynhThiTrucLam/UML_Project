import React, { useState } from "react";
import "./Form.scss";
import PersonalInforForm from "./PersonalInforForm";
import UploadForm from "./UploadForm";
import ChooseDayForm from "./ChooseDayForm";
import Button from "../Button/Button";

const tabs = [
  "Thông tin cá nhân",
  "Upload hồ sơ cá nhân",
  "Chọn lịch học / khám sức khoẻ",
];

const Form = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
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
          <form className="Form-input">
            {activeTab === 0 && <PersonalInforForm />}
            {activeTab === 1 && <UploadForm />}
            {activeTab === 2 && <ChooseDayForm />}
          </form>
          {/* Button điều hướng */}
          <div className="Form-actions">
            {activeTab > 0 && (
              <Button
                text="Quay lại"
                onClick={() => setActiveTab(activeTab + 1)}
              />
            )}
            {activeTab < tabs.length - 1 ? (
              <Button
                text="Tiếp tục"
                isPrimary={true}
                onClick={() => setActiveTab(activeTab + 1)}
              />
            ) : (
              <Button
                text="Hoàn tất đăng ký"
                isPrimary={true}
                onClick={() => setActiveTab(activeTab + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
