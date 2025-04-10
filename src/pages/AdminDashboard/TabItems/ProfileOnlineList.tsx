import { useEffect, useState } from "react";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
import { typeOfLicense } from "../../../components/Form/Features/PersonalInforForm";
import SearchBar from "../../../components/Searchbar/SearchBar";
import Selection from "../../../components/Select/Select";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
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
import { LicenseType } from "../../../store/type/Lincense";
import { mockRegistrations, Profile } from "../../../store/type/Profile";
import "../AdminDashboard.scss";
import RegisterateDetail from "../Detail/RegisterateDetail";

const ProfileOnlineList = () => {
  const [onlineRegistrations, setOnlineRegistrations] = useState<Profile[]>([]);

  const [licenseType, setLicenseType] = useState<LicenseType>(typeOfLicense[0]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearch(value);
    console.log("Searching for:", search);
  };

  const handleApprove = (itemID: string) => {
    console.log(`Hồ sơ ${itemID} được duyệt (chờ thanh toán)`);
    // TODO: Call API to update status from "pending" -> "payment"
  };

  const handleReject = (itemID: string) => {
    console.log(`Hồ sơ ${itemID} bị từ chối`);
    // TODO: Call API to reject the registration
  };

  const handleFilterByDate = () => {
    console.log("Đã lọc hồ sơ theo ngày");
    const filtered = [...onlineRegistrations].sort((a, b) =>
      new Date(a.registrationDate) > new Date(b.registrationDate) ? 1 : -1
    );
    setOnlineRegistrations(filtered);
  };

  const handleFilterByStatus = () => {
    console.log("Đã lọc hồ sơ theo trạng thái");
    const filtered = [...onlineRegistrations].sort((a, b) =>
      a.status.localeCompare(b.status)
    );
    setOnlineRegistrations(filtered);
  };

  const handleFilterByLicenseType = () => {
    console.log("Đã lọc hồ sơ theo loại giấy phép");
    const filtered = onlineRegistrations.filter(
      (item) => item.studentInfor.personalData.licenseType === licenseType.name
    );
    setOnlineRegistrations(filtered);
  };

  const handleConfirm = (itemID: string) => {
    console.log(`Hồ sơ ${itemID} đã xác nhận`);
    // TODO: Call API to update status from "payment" -> "successful"
  };

  useEffect(() => {
    // call API to get all profile having method = "Online" and status = "pending" or "payment"
    const filtered = mockRegistrations.filter(
      (item) =>
        (item.method === "Online" && item.status === "pending") ||
        item.status === "payment"
    );
    setOnlineRegistrations(filtered);
  }, []);

  return (
    <div className="ManageProfile-approve">
      <TabsContent value="approve-online">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h1>Danh sách hồ sơ đăng ký online</h1>
            <div className="ManageProfile-filter">
              <div className="ManageProfile-search">
                <SearchBar
                  placeholder="Tìm kiếm hồ sơ"
                  onChange={() => {}}
                  onSearch={() => {}}
                ></SearchBar>
              </div>
              <div className="ManageProfile-type">
                <Selection
                  placeholder={licenseType.name}
                  data={typeOfLicense}
                  setData={(type) => {
                    setLicenseType(type);
                    handleFilterByLicenseType();
                  }}
                ></Selection>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Table className="File-table border-collapse">
              <TableCaption className="File-caption">
                Bảng thông tin hồ sơ
              </TableCaption>
              <TableHeader className="ManageProfile-approve-header">
                <TableRow className="border border-gray-200">
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200 w-[100px]">
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
                    <div
                      className="flex align-center justify-center"
                      onClick={handleFilterByStatus}
                    >
                      <p>Trạng thái</p>
                      <FilterArrow></FilterArrow>
                    </div>
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                    Chi tiết hồ sơ
                  </TableHead>
                  <TableHead className="ManageProfile-approve-text text-center border border-gray-200"></TableHead>
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
                    <TableCell className="ManageProfile-approve-action text-center border border-gray-200 space-x-2">
                      <Button
                        text="Từ chối"
                        isPrimary={false}
                        onClick={() => handleReject(item.id)}
                      />

                      {item.status === "payment" ? (
                        <Button
                          text="Xác nhận"
                          isPrimary={true}
                          onClick={() => handleConfirm(item.id)}
                        />
                      ) : (
                        <Button
                          text="Duyệt hồ sơ"
                          isPrimary={true}
                          onClick={() => handleApprove(item.id)}
                        />
                      )}
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

export default ProfileOnlineList;
