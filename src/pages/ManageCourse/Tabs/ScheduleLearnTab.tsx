import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import { ScheduleType } from "../../../store/type/ScheduleItem";
import Learn, { formatDate } from "../../Calendar/Tab/Learn";
import "../ManageCourse.scss";
import axios from "axios";

const ScheduleLearnTab = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);
  const [date, setDate] = useState<Date>(new Date());

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
              id: item.license_type.id,
              name: item.license_type.type_name,
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

  return (
    <div className="ManageCourse-schedule">
      {" "}
      <TabsContent value="schedule">
        <Card>
          <CardContent>
            <div className="ManageCourse-schedule-content">
              <div className="ManageCourse-schedule-header">
                <h1 className="ManageCourse-schedule-title">Lịch học</h1>
              </div>

              <Learn
                scheduleData={scheduleData}
                date={date}
                getCourseForCalendar={getCourseForCalendar}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ScheduleLearnTab;
