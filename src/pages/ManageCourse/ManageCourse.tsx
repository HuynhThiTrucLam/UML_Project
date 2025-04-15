import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import "./ManageCourse.scss";
import ClassListTab from "./Tabs/ClassListTab";
import CourseListTab from "./Tabs/CourseListTab";
import ListStudent from "./Tabs/ListStudentTab";
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
            <TabsTrigger value="listStudent">
              Tra cứu danh sách học viên
            </TabsTrigger>
          </TabsList>
        </div>

        {/* <TabsContent value="approve-offline">*/}
        <TabsContent value="schedule">
          <ScheduleLearnTab />
        </TabsContent>
        <TabsContent value="courses">
          <CourseListTab />
        </TabsContent>
        <TabsContent value="class">
          <ClassListTab />
        </TabsContent>
        <TabsContent value="listStudent">
          <ListStudent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageCourse;
