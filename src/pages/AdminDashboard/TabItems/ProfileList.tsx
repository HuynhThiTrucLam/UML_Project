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
import { Profile } from "../../../store/type/Profile";
import RegisterateDetail from "../Detail/RegisterateDetail";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Selection from "../../../components/Select/Select";
import SearchBar from "../../../components/Searchbar/SearchBar";
import axios from "axios";
import { LicenseType } from "../../../store/type/Lincense";

const ProfileList = () => {
  const [typeOfLicenses, setTypeOfLicenses] = useState<LicenseType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Profile[]>([]);
  const [onlineRegistrations, setOnlineRegistrations] = useState<Profile[]>([]);
  const [licenseType, setLicenseType] = useState<LicenseType>(
    typeOfLicenses[0]
  );
  const handleUpdateRegistration = async (itemID: string, status: string) => {
    console.log(`Hồ sơ ${itemID} bị từ chối`);
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/api/course_registration/${itemID}`,
        {
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Hồ sơ đã bị từ chối:", response.data);
      // Update the state to remove the rejected item
      await RetrieveListOnlineRegistration();
    } catch (error) {
      console.error("Error rejecting hồ sơ:", error);
    }
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
      (item) => item.studentInfor.personalData.licenseType === licenseType?.name
    );
    setSearchResult(filtered);
  };

  const getTypeOfLicense = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/license_type/?skip=0&limit=100"
      );
      const licenseTypes = response.data.items.map((item: any) => ({
        id: item.id,
        name: item.type_name,
      }));
      // return licenseTypes;
      setTypeOfLicenses(licenseTypes);
    } catch (error) {
      console.error("Error fetching license types:", error);
      return [];
    }
  };
  const RetrieveListOnlineRegistration = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/course_registration?type=all&status=successful"
      );
      const data: Profile[] = response.data;
      setOnlineRegistrations(data);
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching online registrations:", error);
    }
  };
  useEffect(() => {
    RetrieveListOnlineRegistration();
    getTypeOfLicense();
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResult(onlineRegistrations);
      return;
    }
    const filtered = onlineRegistrations.filter((item) => {
      const idMatch = item.id.toLowerCase().includes(searchValue.toLowerCase());
      const nameMatch = item.studentInfor.personalData.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return idMatch || nameMatch;
    });
    setSearchResult(filtered);
  }, [searchValue, onlineRegistrations]);

  const onSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <div className="ManageProfile-approve">
      <TabsContent value="list">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h1>Danh sách hồ sơ đăng ký online</h1>
            <div className="ManageProfile-filter">
              <div className="ManageProfile-search">
                <SearchBar
                  placeholder="Tìm kiếm hồ sơ"
                  onChange={onSearch}
                ></SearchBar>
              </div>
              <div className="ManageProfile-type">
                <Selection
                  placeholder={licenseType?.name}
                  data={typeOfLicenses}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResult.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border border-gray-200 hover:bg-gray-100"
                  >
                    <TableCell className="text-center border border-gray-200">
                      {item.id.split("-")[1]}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {item.studentInfor.personalData.name}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {item.registrationDate}
                    </TableCell>
                    <TableCell
                      className="text-center border border-gray-200"
                      style={{
                        textTransform: "capitalize",
                        color:
                          item.status === "pending"
                            ? "#FFB800"
                            : item.status === "approved"
                            ? "#00B0FF"
                            : item.status === "payment"
                            ? // blue #00B0FF
                              "#00B0FF"
                            : item.status === "successful"
                            ? "#00C853"
                            : item.status === "rejected"
                            ? "#FF3D00"
                            : "#000000",
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      <RegisterateDetail data={item}></RegisterateDetail>
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
