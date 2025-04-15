import { useEffect, useState } from "react";
import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
import SearchBar from "../../../components/Searchbar/SearchBar";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { License } from "../../../store/type/Lincense";

const mockLicenses: License[] = [
  {
    id: "1",
    typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" }, // A - Motorcycle
    studentId: "student001",
    releaseDate: "2023-01-15",
    endDate: "2028-01-15",
    expiredDate: "2028-01-15",
    status: "active",
  },
  {
    id: "2",
    typeOfLicense: { id: "A2", name: "Giấy phép lái xe A2" }, // B - Car
    studentId: "student002",
    releaseDate: "2020-06-10",
    endDate: "2025-06-10",
    expiredDate: "2023-06-10",
    status: "expired",
  },
  {
    id: "3",
    typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" }, // C - Truck
    studentId: "student003",
    releaseDate: "2022-09-01",
    endDate: "2027-09-01",
    expiredDate: "2027-09-01",
    status: "suspended",
  },
  {
    id: "4",
    typeOfLicense: { id: "A1", name: "Giấy phép lái xe A1" },
    studentId: "student004",
    releaseDate: "2021-03-20",
    endDate: "2026-03-20",
    expiredDate: "",
    status: "revoked",
  },
];

const LicenseTable = () => {
  console.log("Filter");
  const [licenses, setLicenses] = useState<License[]>([]);

  useEffect(() => {
    //Call API to get license List
    setLicenses(mockLicenses);
  });

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageLicense-filter flex gap-4">
            <div className="ManageLicense-search flex-1">
              <SearchBar
                placeholder="Tìm kiếm giấy phép"
                onChange={() => {}}
                onSearch={() => {}}
              />
            </div>
          </div>
          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin các giấy phép hiện hiện đang quản lý
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-50 border border-gray-200">
                <TableHead className="text-center border">
                  Mã giấy phép
                </TableHead>
                <TableHead
                  className="text-center flex justify-center items-center gap-1 border"
                  onClick={() => {}}
                >
                  <p>Hạng bằng</p>
                  <FilterArrow />
                </TableHead>
                <TableHead className="text-center border">
                  Mã học viên
                </TableHead>

                <TableHead
                  className="text-center flex justify-center items-center gap-1 border"
                  onClick={() => {}}
                >
                  <p>Trạng thái</p>
                  <FilterArrow />
                </TableHead>
                <TableHead className="text-center border">Thời hạn</TableHead>
                <TableHead className="text-center border">
                  Ngày gia hạn
                </TableHead>
                <TableHead className="text-center border"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow key={license.id} className="border">
                  <TableCell className="text-center border">
                    {license.id}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.typeOfLicense.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.studentId}
                  </TableCell>
                  <TableCell className="text-center border">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        license.status === "active"
                          ? "bg-green-100 text-green-800"
                          : license.status === "expired"
                          ? "bg-gray-100 text-gray-800"
                          : license.status === "suspended"
                          ? "bg-yellow-100 text-yellow-800"
                          : license.status === "revoked"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }`}
                    >
                      {license.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.releaseDate} - {license.endDate}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.expiredDate ? license.expiredDate : "Chưa có"}
                  </TableCell>
                  <TableCell className="flex gap-2 text-center border">
                    <Button text="Sửa" isPrimary={false} onClick={() => {}} />
                    <Button text="Xoá" isPrimary={true} onClick={() => {}} />
                  </TableCell>
                </TableRow>
              ))}
              {licenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Không có khoá học nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseTable;
