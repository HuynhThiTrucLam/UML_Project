import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import CourseDialog from "../Components/CourseDialog";
import CourseTable from "../Components/CourseTable";

const CourseListTab = () => {
  return (
    <div className="ManageCourse-courses">
      {" "}
      <TabsContent value="courses">
        <Card>
          <CardContent>
            {" "}
            <div className="ManageCourse-courses-content">
              <div className="ManageCourse-courses-header">
                <h1 className="ManageCourse-courses-title">
                  Danh sách các khoá học
                </h1>
                <CourseDialog mode="add"></CourseDialog>
              </div>

              <CourseTable></CourseTable>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default CourseListTab;
