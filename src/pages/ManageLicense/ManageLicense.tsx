import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import "./ManageLicense.scss";
import ApproveLicense from "./Tabs/ApproveLicense";
import Expiredlicense from "./Tabs/ExpiredLicense";
import LicenseListTab from "./Tabs/LicenseListTab";

const ManageLicense = () => {
  return (
    <div className="ManageLicense">
      <Tabs defaultValue="licenses" className="w-full">
        <div className="ManageLicense-tablist">
          <TabsList className=" ManageLicense-tablist-item">
            <TabsTrigger value="licenses">Danh sách giấy phép</TabsTrigger>
            <TabsTrigger value="approve">Duyệt giấy phép</TabsTrigger>
            <TabsTrigger value="renewal">Gia hạn giấy phép</TabsTrigger>
          </TabsList>
        </div>

        {/* <TabsContent value="approve-offline">*/}
        <LicenseListTab></LicenseListTab>
        <ApproveLicense></ApproveLicense>
        <Expiredlicense></Expiredlicense>
      </Tabs>
    </div>
  );
};

export default ManageLicense;
