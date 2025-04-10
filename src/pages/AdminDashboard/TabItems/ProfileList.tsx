import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { TabsContent } from "../../../components/ui/tabs";
import { mockRegistrations, Profile } from "../../../store/type/Profile";
import RegisterateDetail from "../Detail/RegisterateDetail";

const ProfileList = () => {
  const [profileData, setProfileData] = useState<Profile[]>([]);

  useEffect(() => {
    const filtered = mockRegistrations.filter(
      (item) =>
        (item.method === "Online" && item.status === "successful") ||
        item.status === "rejected"
    );
    setProfileData(filtered);
  }, []);
  return (
    <div className="ManageProfile-approve">
      <TabsContent value="list">
        <Card>
          <CardHeader>
            <CardTitle>Danh sách hồ sơ đăng ký tại trung tâm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Table className="File-table border-collapse">
              <TableCaption className="File-caption">
                Bảng thông tin hồ sơ
              </TableCaption>
              <TableHeader className="ManageProfile-approve-header">
                <TableRow className=" ManageProfile-approve-header border border-gray-200">
                  <TableHead className="ManageProfile-approve-text w-[100px] text-center border border-gray-200">
                    Mã hồ sơ
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                    Thông tin hồ sơ
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                    Ngày tạo
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                    Trạng thái
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                    Chi tiết hồ sơ
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profileData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border border-gray-200 hover:bg-gray-100"
                  >
                    <TableCell className="text-center border border-gray-200">
                      {item.id}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {item.studentInfor.personalData.name}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {item.registrationDate}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {item.status}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      <RegisterateDetail
                        registerID={item.id}
                      ></RegisterateDetail>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ProfileList;
