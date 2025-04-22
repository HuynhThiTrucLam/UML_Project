// ClassScheduleCalendar.tsx
import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import { ScheduleType } from "../../../store/type/ScheduleItem";

interface ClassScheduleCalendarProps {
  scheduleData: ScheduleType[];
  selectedDate?: Date;
  isCourse: boolean;
}

const ScheduleItem: React.FC<ClassScheduleCalendarProps> = ({
  scheduleData,
  selectedDate = new Date(),
  isCourse,
}) => {
  // Get the current week's dates based on the selected date
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    const generateWeekDates = (date: Date): Date[] => {
      const currentDay = new Date(date);
      const day = currentDay.getDay(); // 0 is Sunday, 1 is Monday, etc.

      // Calculate the date of Monday in the current week
      const mondayDate = new Date(currentDay);
      mondayDate.setDate(currentDay.getDate() - (day === 0 ? 6 : day - 1));

      // Generate dates for the week (Monday to Sunday)
      const dates: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(mondayDate);
        date.setDate(mondayDate.getDate() + i);
        dates.push(date);
      }

      return dates;
    };

    setWeekDates(generateWeekDates(selectedDate));
  }, [selectedDate]);

  // Format the time from 24-hour format
  const formatTime = (time: Date): string => {
    return `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Get classes for a specific date
  const getClassesForDate = (date: Date): ScheduleType[] => {
    return scheduleData
      .filter((item) => {
        // Parse the startTime from string to Date object
        const classDate = new Date(item.startTime);

        // Compare date components
        return (
          classDate.getDate() === date.getDate() &&
          classDate.getMonth() === date.getMonth() &&
          classDate.getFullYear() === date.getFullYear()
        );
      })
      .sort((a, b) => {
        // Sort by start time
        return (
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      });
  };

  // Get color class based on class type
  const getColorClass = (type: string): string => {
    switch (type) {
      case "theory":
        return "bg-[#EAFBF3]";
      case "practice":
        return "bg-[#EDFAFF]";
      default:
        return "bg-[#FFEDED]";
    }
  };

  return (
    <div className="schedule-calendar">
      <div className="schedule-container">
        {/* Calendar Header */}
        <div className="calendar-header">
          {weekDates.map((date, index) => (
            <div key={index} className="day-column">
              <div className="date-number">{date.getDate()}</div>
              <div className="day-name">
                {
                  [
                    "Thứ hai",
                    "Thứ ba",
                    "Thứ tư",
                    "Thứ năm",
                    "Thứ sáu",
                    "Thứ bảy",
                    "Chủ nhật",
                    // "Tuesday",
                    // "Wednesday",
                    // "Thursday",
                    // "Friday",
                    // "Saturday",
                    // "Sunday",
                  ][index]
                }
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="calendar-body">
          {weekDates.map((date, dateIndex) => {
            const classesForDate = getClassesForDate(date);

            return (
              <div key={dateIndex} className="date-column">
                {classesForDate.length === 0 ? (
                  <div className="no-classes">Không có lớp học nào</div>
                ) : (
                  classesForDate.map((classItem, classIndex) => (
                    <div
                      key={classIndex}
                      className={`class-item ${getColorClass(classItem.type)}`}
                    >
                      <div className="class-code">
                        {classItem.courseId.split("-")[1]}
                      </div>
                      <div className="class-time">
                        Thời gian: {formatTime(new Date(classItem.startTime))}-{" "}
                        {formatTime(new Date(classItem.endTime))}
                      </div>
                      <div className="class-room">
                        Địa điểm: {classItem.location}
                      </div>
                      <div className="student-count">
                        Hạng bằng lái: {classItem.typeOfLicense.name}
                      </div>
                      <div className="student-count">
                        Hình thức:{" "}
                        {classItem.type === "theory"
                          ? "Lý thuyết"
                          : classItem.type === "practice"
                          ? "Thực hành"
                          : "Thi"}
                      </div>
                      {isCourse && classItem.teacher && (
                        <div className="teacher-info">
                          <div className="teacher-avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <span className="teacher-name">
                            {classItem.teacher || "Chưa có thông tin"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
