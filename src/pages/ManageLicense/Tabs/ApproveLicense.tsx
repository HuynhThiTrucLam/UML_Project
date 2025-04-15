import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
import Selection from "../../../components/Select/Select";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import ProfileList from "../../AdminDashboard/TabItems/ProfileList";
import { mockCourseList } from "../../ManageCourse/Components/ClassDialog";
import ApproveTable from "../Components/ApproveTable";
import LicenseTable from "../Components/LicenseTable";

const ApproveLicense = () => {
  return (
    <div>
      {" "}
      <TabsContent value="approve">
        <Card>
          <CardContent>
            {" "}
            <div className="ManageLicense-license-content">
              <div className="ManageLicense-license-header">
                <h1>Danh sách hồ sơ đủ điều kiện cấp giấy phép</h1>
                <p></p>
              </div>
              <div className="ManageLicense-approve-filter">
                <Selection
                  title="Lọc theo Hạng bằng lái"
                  lable="Lọc theo hạng bằng lái"
                  data={typeOfLicense}
                  placeholder="Chọn hạng bằng lái"
                  setData={() => {}}

                  // value={selectedCourse?.id}
                />

                <Selection
                  title="Lọc theo Khóa học"
                  lable="Lọc theo khóa học"
                  data={mockCourseList}
                  placeholder="Chọn khóa học"
                  setData={() => {}}
                  // value={selectedCourse?.id}
                />
              </div>
            </div>
            <ApproveTable></ApproveTable>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ApproveLicense;
