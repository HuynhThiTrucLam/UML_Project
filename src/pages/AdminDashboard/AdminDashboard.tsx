import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import CreateNew from "./TabItems/CreateNew";

import "./AdminDashboard.scss";

import ProfileList from "./TabItems/ProfileList";
import ProfileOfflineList from "./TabItems/ProfileOfflineList";
import ProfileOnlineList from "./TabItems/ProfileOnlineList";

const AdminDashboard = () => {
  return (
    <div className="ManageProfile">
      <Tabs defaultValue="create" className="w-full">
        <div className="ManageProfile-tablist">
          <TabsList className=" ManageProfile-tablist-item">
            <TabsTrigger value="create">Tạo hồ sơ mới</TabsTrigger>
            <TabsTrigger value="approve-offline">
              Duyệt hồ sơ offline
            </TabsTrigger>
            <TabsTrigger value="approve-online">Duyệt hồ sơ online</TabsTrigger>
            <TabsTrigger value="list">Danh sách hồ sơ</TabsTrigger>
          </TabsList>
        </div>

        {/* <TabsContent value="approve-offline">*/}
        <CreateNew></CreateNew>
        <ProfileOnlineList></ProfileOnlineList>
        <ProfileOfflineList></ProfileOfflineList>
        <ProfileList></ProfileList>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
