import React, { useEffect, useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import { ScheduleItem } from "../../../store/type/ScheduleItem";
import Schedule from "../Component/Schedule";

interface LearnProps {
  schedulData: ScheduleItem[];
}

const Learn = ({ schedulData }: LearnProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<ScheduleItem[]>([]);

  const getCourseForCalendar = (date: Date | undefined) => {
    //Goi API de lay lich thi cua tuan cua date
    setDate(date);
  };

  useEffect(() => {
    //Goi API de lay lich hoc cua tuan hien tai
    setData(schedulData);
  });

  return (
    <div className="Calendar-test">
      <div className="Calendar-big">
        <Schedule
          scheduleData={data}
          selectedDate={date}
          isCourse={true}
        ></Schedule>
      </div>
      <div className="Calendar-small">
        <Calendar
          mode="single"
          selected={date}
          onSelect={getCourseForCalendar}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Learn;
