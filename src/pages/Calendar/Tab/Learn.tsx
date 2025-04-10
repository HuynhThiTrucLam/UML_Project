import React, { useEffect, useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import ScheduleItem from "../Component/Schedule";
import { ScheduleType } from "../../../store/type/ScheduleItem";

interface LearnProps {
  scheduleData: ScheduleType[];
}

const Learn = ({ scheduleData }: LearnProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<ScheduleType[]>([]);

  const getCourseForCalendar = (date: Date | undefined) => {
    //Goi API de lay lich thi cua tuan cua date
    setDate(date);
  };

  useEffect(() => {
    //Goi API de lay lich hoc cua tuan hien tai
    setData(scheduleData);
  });

  return (
    <div className="Calendar-test">
      <div className="Calendar-big">
        <ScheduleItem
          scheduleData={data}
          selectedDate={date}
          isCourse={true}
        ></ScheduleItem>
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
