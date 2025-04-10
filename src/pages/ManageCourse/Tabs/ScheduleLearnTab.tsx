import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import { ScheduleType } from "../../../store/type/ScheduleItem";
import { scheduleItems } from "../../Calendar/Calendar";
import Learn from "../../Calendar/Tab/Learn";
import "../ManageCourse.scss";

const ScheduleLearnTab = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>();

  useEffect(() => {
    //Goi API de lay lich hoc cua tuan hien tai
    setScheduleData(scheduleItems);
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

              <Learn scheduleData={scheduleData || []}></Learn>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ScheduleLearnTab;
