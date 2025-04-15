import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import LicenseTable from "../Components/LicenseTable";

const LicenseListTab = () => {
  return (
    <div>
      <TabsContent value="licenses">
        <Card>
          <CardContent>
            {" "}
            <div className="ManageLicense-license-content">
              <div className="ManageLicense-license-header">
                <h1 className="ManageLicense-license-title">
                  Tất cả giấy phép đang quản lý
                </h1>
              </div>
              <LicenseTable></LicenseTable>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default LicenseListTab;
