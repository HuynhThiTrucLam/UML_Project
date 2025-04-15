import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import ClassDialog from "../Components/ClassDialog";
import ClassTable from "../Components/ClassTable";
const ClassListTab = () => {
  return (
    <div className="ManageCourse">
      <div className="ManageCourse-class">
        {" "}
        <TabsContent value="class">
          <Card>
            <CardContent>
              {" "}
              <div className="ManageCourse-class-content">
                <div className="ManageCourse-class-header">
                  <h1 className="ManageCourse-class-title">
                    Danh sách các lớp học hiện có
                  </h1>
                  <ClassDialog mode="add"></ClassDialog>
                </div>
              </div>
              <ClassTable></ClassTable>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default ClassListTab;
