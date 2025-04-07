import React, { use, useEffect, useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import Schedule from "../Component/Schedule";
import { ScheduleItem } from "../../../store/type/ScheduleItem";

interface TestProps {
  schedulData: ScheduleItem[];
}

const Test = ({ schedulData }: TestProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<ScheduleItem[]>([]);

  const getTestForCalendar = (date: Date | undefined) => {
    //Goi API de lay lich hoc cua tuan cua date
    setDate(date);
  };

  useEffect(() => {
    //Goi API de lay lich hoc cua tuan hien tai
    setData(schedulData);
  }, [schedulData]);

  return (
    <div className="Calendar-test">
      <div className="Calendar-big">
        <Schedule
          scheduleData={data}
          selectedDate={date}
          isCourse={false}
        ></Schedule>
      </div>
      <div className="Calendar-small">
        <Calendar
          mode="single"
          selected={date}
          onSelect={getTestForCalendar}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Test;
