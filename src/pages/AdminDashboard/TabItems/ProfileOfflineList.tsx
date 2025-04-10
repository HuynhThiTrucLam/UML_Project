import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
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

import FilterArrow from "../../../assets/icons/FilterArrow";

const ProfileOfflineList = () => {
  const [onlineRegistrations, setOnlineRegistrations] = useState<Profile[]>([]);

  const handleApprove = (itemID: string) => {
    // Goij API đổi status từ pending sang successful
    console.log("Đã duyệt hồ sơ");
  };

  const handleReject = (itemID: string) => {
    // Goij API đổi status từ pending sang successful
    console.log("từ chối hồ sơ");
  };

  const handleFilterByDate = () => {
    // Goij API đổi status từ pending sang successful
    console.log("Đã lọc hồ sơ theo ngày");
    const filtered = onlineRegistrations.sort((a, b) =>
      new Date(a.registrationDate) > new Date(b.registrationDate) ? 1 : -1
    );
    setOnlineRegistrations(filtered);
  };

  useEffect(() => {
    const filtered = mockRegistrations.filter(
      (item) => item.method === "Offline" && item.status === "pending"
    );
    setOnlineRegistrations(filtered);
  }, []);

  return (
    <div className="ManageProfile-approve">
      <TabsContent value="approve-offline">
        <Card>
          <CardHeader>
            <h1>Danh sách hồ sơ đăng ký tại trung tâm</h1>
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
                  <TableHead
                    className="ManageProfile-approve-text  flex justfy-center text-center border border-gray-200"
                    onClick={handleFilterByDate}
                  >
                    <p>Ngày tạo</p>
                    <FilterArrow></FilterArrow>
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                    <div className="flex align-center justify-center">
                      <p>Trạng thái</p>
                      <FilterArrow></FilterArrow>
                    </div>
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                    Chi tiết hồ sơ
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text  text-center border border-gray-200"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onlineRegistrations.map((item) => (
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
                    <TableCell className="ManageProfile-approve-action text-center border border-gray-200">
                      <Button
                        text="Từ chối"
                        isPrimary={false}
                        onClick={() => {
                          handleReject(item.id);
                        }}
                      />
                      <Button
                        text="Duyệt"
                        isPrimary={true}
                        onClick={() => handleApprove(item.id)}
                      />
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

export default ProfileOfflineList;
