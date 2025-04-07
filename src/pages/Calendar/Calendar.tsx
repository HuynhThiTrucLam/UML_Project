import { useEffect, useRef, useState } from "react";
import { default as CalendarIcon } from "../../assets/icons/Calendar";
import Button from "../../components/Button/Button";
import "./Calendar.scss";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { mocktypeOfLicense } from "../../components/Form/Features/PersonalInforForm";
import Test from "./Tab/Test";
import Learn from "./Tab/Learn";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import AbsentForm from "./Tab/AbsentForm";
import { ScheduleItem } from "../../store/type/ScheduleItem";

export const scheduleItems: ScheduleItem[] = [
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-03-31", // Monday
    startTime: "9:00 AM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "1",
  },
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-04-01", // Tuesday
    startTime: "11:00 AM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "2",
  },
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-04-02", // Wednesday
    startTime: "13:00 PM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "3",
  },
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-04-03", // Thursday
    startTime: "9:00 AM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "4",
  },
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-04-04", // Friday
    startTime: "12:00 PM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "5",
  },
  {
    classCode: "#ABCD",
    classroom: "A01",
    date: "2025-04-06", // Saturday
    startTime: "9:00 AM",
    studentCount: 30,
    teacher: "Nguyễn Văn A",
    licenseTypeId: "1",
  },
];

const tabs = [
  "Lịch học",
  "Lịch thi",
  " Form xin thay đổi lịch học / lịch thi / lịch dạy",
];

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [licenseType, setLicenseType] = useState<string>(
    mocktypeOfLicense[0].name
  );

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFillter = (id: string) => {
    //goi api lay danh sach lich hoc theo id
    console.log("Laasy lich hoc theo hang bang", id);
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
            <Select>
              <SelectTrigger className="Calendar-filter-container">
                <SelectValue placeholder={licenseType} />
              </SelectTrigger>
              <SelectContent className="Calendar-filter-container">
                <SelectGroup>
                  <SelectLabel>Chọn hạng bằng lái</SelectLabel>
                  {mocktypeOfLicense.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.name}
                      onClick={() => {
                        handleFillter(item.id);
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
        </div>
        <div className="Calendar-content">
          {activeTab === 0 && <Learn schedulData={scheduleData}></Learn>}
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
