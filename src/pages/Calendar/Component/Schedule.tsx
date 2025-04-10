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
  const formatTime = (hour: number): string => {
    return `${hour}:00`;
  };

  // Generate array of hours from 8 to 15 (8 AM to 3 PM)
  const hours: number[] = Array.from({ length: 8 }, (_, i) => i + 8);

  // Check if a class is scheduled at a specific date and hour
  const getClassForDateAndHour = (
    date: Date,
    hour: number
  ): ScheduleType | undefined => {
    // console.info("scheduleData: ", scheduleData);
    const result = scheduleData.find((item) => {
      const classDate = new Date(item.date);
      return (
        classDate.getDate() === date.getDate() &&
        classDate.getMonth() === date.getMonth() &&
        classDate.getFullYear() === date.getFullYear() &&
        parseInt(item.startTime.split(":")[0]) === hour
      );
    });
    // console.info("result: ", result);
    return result;
  };

  // Get color class based on class code
  const getColorClass = (licenseTypeId: string): string => {
    switch (licenseTypeId) {
      case "1":
        return "bg-[#EAFBF3]";
      case "2":
        return "bg-[#EDFAFF]";
      case "3":
        return "bg-[#FEF3D5]";
      case "4":
        return "bg-[#DFF0FF]";
      default:
        return "bg-[#FFEDED]";
    }
  };

  return (
    <div className="schedule-calendar">
      <div className="schedule-container">
        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="time-column">
            <div className="clock-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>

          {weekDates.map((date, index) => (
            <div key={index} className="day-column">
              <div className="date-number">{date.getDate()}</div>
              <div className="day-name">
                {
                  [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ][index]
                }
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        {hours.map((hour) => (
          <div key={hour} className="calendar-row">
            <div className="time-cell">{formatTime(hour)}</div>

            {weekDates.map((date, dateIndex) => {
              const classItem = getClassForDateAndHour(date, hour);

              return (
                <div key={dateIndex} className="day-cell">
                  {classItem && (
                    <div
                      className={`class-item ${getColorClass(
                        classItem.courseId
                      )}`}
                    >
                      <div className="class-code">{classItem.courseId}</div>
                      <div className="class-room">
                        Địa điểm: {classItem.location}
                      </div>
                      <div className="class-time">
                        Thời gian: {classItem.startTime} - {classItem.endTime}
                      </div>
                      <div className="student-count">
                        Hạng bằng lái: {classItem.typeOfLicense}
                      </div>
                      <div className="student-count">
                        Hình thức: {classItem.type}
                      </div>
                      {isCourse && (
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
                            {classItem.teacher}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleItem;
