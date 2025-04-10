import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import "./ManageCourse.scss";
import ClassListTab from "./Tabs/ClassListTab";
import CourseListTab from "./Tabs/CourseListTab";
import ScheduleLearnTab from "./Tabs/ScheduleLearnTab";

const ManageCourse = () => {
  return (
    <div className="ManageCourse">
      <Tabs defaultValue="schedule" className="w-full">
        <div className="ManageCourse-tablist">
          <TabsList className=" ManageCourse-tablist-item">
            <TabsTrigger value="schedule">Lịch học</TabsTrigger>
            <TabsTrigger value="courses">Danh sách khoá học</TabsTrigger>
            <TabsTrigger value="class">Danh sách lớp học</TabsTrigger>
          </TabsList>
        </div>

        {/* <TabsContent value="approve-offline">*/}
        <ScheduleLearnTab></ScheduleLearnTab>
        <CourseListTab></CourseListTab>
        <ClassListTab></ClassListTab>
      </Tabs>
    </div>
  );
};

export default ManageCourse;
