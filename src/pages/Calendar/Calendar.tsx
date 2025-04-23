import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { default as CalendarIcon } from "../../assets/icons/Calendar";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { ScheduleType } from "../../store/type/ScheduleItem";
import "./Calendar.scss";
import Learn, { formatDate } from "./Tab/Learn";
import Test from "./Tab/Test";

const tabs = ["Lịch học lý thuyết", "Lịch học thực hành", "Lịch thi"];

interface ScheduleTypeFiltered {
  type: string;
  data: ScheduleType[];
}

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<number>(0);
  const [scheduleDataFiltered, setScheduleDataFiltered] = useState<
    ScheduleTypeFiltered[]
  >([]);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getCourseForCalendar = useCallback(
    async (selectedDate: Date | undefined) => {
      if (!selectedDate) return;

      setDate(selectedDate);

      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday

      const endOfWeek = new Date(selectedDate);
      endOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 7); // Sunday

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/schedule/?start_time=${formatDate(
            startOfWeek
          )}&end_time=${formatDate(endOfWeek)}`
        );

        const scheduleItems = response.data.items.map(
          (item: any): ScheduleType => ({
            id: item.id,
            courseId: item.course_id,
            typeOfLicense: {
              id: item.license_type?.id,
              name: item.license_type?.type_name,
            },
            type: item.type,
            startTime: item.start_time,
            endTime: item.end_time,
            location: item.location,
            teacher: item.teacher_name,
          })
        );

        setScheduleData(scheduleItems);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    },
    []
  );

  useEffect(() => {
    getCourseForCalendar(date);
  }, []);

  useEffect(() => {
    const filteredData: ScheduleTypeFiltered[] = [];

    scheduleData.forEach((item) => {
      const existingType = filteredData.find((data) => data.type === item.type);

      if (existingType) {
        existingType.data.push(item);
      } else {
        filteredData.push({ type: item.type, data: [item] });
      }
    });

    setScheduleDataFiltered(filteredData);
  }, [scheduleData]);

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
        </div>
        <div className="Calendar-content">
          {activeTab === 0 && (
            <Learn
              scheduleData={
                scheduleDataFiltered.find((item) => item.type === "theory")
                  ?.data || []
              }
              date={date}
              getCourseForCalendar={getCourseForCalendar}
            ></Learn>
          )}
          {activeTab === 1 && (
            <Learn
              scheduleData={
                scheduleDataFiltered.find((item) => item.type === "practice")
                  ?.data || []
              }
              date={date}
              getCourseForCalendar={getCourseForCalendar}
            ></Learn>
          )}
          {activeTab === 2 && (
            <Test
              scheduleData={
                scheduleDataFiltered.find((item) => item.type === "exam")
                  ?.data || []
              }
            ></Test>
          )}
        </div>
        <div ref={formRef}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
