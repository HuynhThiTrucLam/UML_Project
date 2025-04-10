import { useEffect, useRef, useState } from "react";
import { default as CalendarIcon } from "../../assets/icons/Calendar";
import Button from "../../components/Button/Button";
import { typeOfLicense } from "../../components/Form/Features/PersonalInforForm";
import Form from "../../components/Form/Form";
import Selection from "../../components/Select/Select";
import { ScheduleType } from "../../store/type/ScheduleItem";
import "./Calendar.scss";
import AbsentForm from "./Tab/AbsentForm";
import Learn from "./Tab/Learn";
import Test from "./Tab/Test";

export const scheduleItems: ScheduleType[] = [
  {
    id: "1",
    courseId: "1",
    typeOfLicense: "B1",
    type: "LyThuyet",
    date: "2025-04-09",
    startTime: "08:00",
    endTime: "10:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "2",
    courseId: "1",
    typeOfLicense: "B1",
    type: "ThucHanh",
    date: "2025-04-10",
    startTime: "08:00",
    endTime: "10:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "3",
    courseId: "1",
    typeOfLicense: "B1",
    type: "Thi",
    date: "2025-04-08",
    startTime: "08:00",
    endTime: "10:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "4",
    courseId: "2",
    typeOfLicense: "B2",
    type: "LyThuyet",
    date: "2025-04-11",
    startTime: "08:00",
    endTime: "10:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn B",
  },
  {
    id: "5",
    courseId: "2",
    typeOfLicense: "B2",
    type: "ThucHanh",
    date: "2025-04-12",
    startTime: "12:00",
    endTime: "16:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn B",
  },
  {
    id: "6",
    courseId: "2",
    typeOfLicense: "B2",
    type: "Thi",
    date: "2025-04-13",
    startTime: "08:00",
    endTime: "10:00",
    location: "Hà Nội",
    teacher: "Nguyễn Văn B",
  },
];

const tabs = [
  "Lịch học",
  "Lịch thi",
  " Form xin thay đổi lịch học / lịch thi / lịch dạy",
];

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [licenseType, setLicenseType] = useState<string>(typeOfLicense[0].name);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    //Goi API de lay lich hoc cua tuan hien tai
    setScheduleData(scheduleItems);
  });
  return (
    <div className="Calendar">
      <div className="Calendar-container">
        <div className="Calendar-landing">
          <div className="Calendar-header">
            <CalendarIcon></CalendarIcon>
            <h1 className="Calendar-title">Xem lịch học, lịch thi</h1>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <Button
            text="ĐĂNG KÝ THI NGAY"
            isPrimary={true}
            onClick={scrollToForm}
          />
        </div>
        <div className="Calendar-nav">
          {/* Tabs */}
          <div className="Calendar-tab">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`Calendar-tab-item ${
                  index === activeTab ? "isActive" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <p>{tab}</p>
              </div>
            ))}
          </div>
          <div className="Calendar-filter">
            <Selection
              placeholder={licenseType}
              data={typeOfLicense}
              setData={() => {
                setLicenseType;
              }}
            ></Selection>
          </div>
        </div>
        <div className="Calendar-content">
          {activeTab === 0 && <Learn scheduleData={scheduleData}></Learn>}
          {activeTab === 1 && <Test schedulData={scheduleData}></Test>}
          {activeTab === 2 && <AbsentForm></AbsentForm>}
        </div>
        <div ref={formRef}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
