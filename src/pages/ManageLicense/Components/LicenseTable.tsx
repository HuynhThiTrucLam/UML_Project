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
import axios from "axios";
import dayjs from "dayjs";
import LicenseDialog from "./LicenseDialog";

const LicenseTable = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [licensesFiltered, setLicensesFiltered] = useState<License[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const fetchLicenses = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/licenses"
      );
      const result = response.data?.map((item: any) => ({
        id: item.id,
        licenseNumber: item.license_number,
        typeOfLicense: {
          id: item.license_type_id,
          name: item.license_type_name,
        },
        studentId: item.student_id,
        createdAt: dayjs(item.created_at).format("DD/MM/YYYY"),
        expirationDate: dayjs(item.expiration_date).format("DD/MM/YYYY"),
        status: item.status,
        courseId: item.course_id,
      })) as License[];
      setLicenses(result);
      setLicensesFiltered(result);
    } catch (err) {
      console.error("Error fetching licenses:", err);
      // For development, using mock data when API fails
      // Remove this in production
      setLicenses([
        {
          id: "2",
          licenseNumber: "DL-20250423-2C4B",
          typeOfLicense: {
            id: "d64eb185-9581-4de8-b041-dd7a06449cf1",
            name: "A1",
          },
          studentId: "5c0735a3-b965-443a-a301-290b10f4924d",
          createdAt: "2025-04-23T01:58:18.104182",
          expirationDate: "2028-04-22T01:58:18.104182",
          status: "pending",
          courseId: "f8e16970-bf12-4485-96ff-c26ff787e04f",
        },
      ]);
    }
  };

  useEffect(() => {
    if (searchValue === "") {
      setLicensesFiltered(licenses);
      return;
    }
    const filtered = licenses.filter((item) => {
      const idMatch = item.typeOfLicense.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const nameMatch = item.licenseNumber
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return idMatch || nameMatch;
    });
    setLicensesFiltered(filtered);
  }, [searchValue, licenses]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <div className="ManageLicense-filter flex gap-4">
            <div className="ManageLicense-search flex-1">
              <SearchBar
                placeholder="Tìm kiếm giấy phép"
                onChange={handleSearch}
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
              {licensesFiltered?.map((license) => (
                <TableRow key={license.id} className="border">
                  <TableCell className="text-center border">
                    {license.licenseNumber}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.typeOfLicense?.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.studentId.split("-")[1]}
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
                          : license.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : ""
                      }`}
                    >
                      {license.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.createdAt} - {license.expirationDate}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.expirationDate
                      ? license.expirationDate
                      : "Chưa có"}
                  </TableCell>
                  <TableCell className="flex gap-2 text-center border">
                    <LicenseDialog
                      mode="edit"
                      initialData={license}
                      onUpdate={fetchLicenses}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {licensesFiltered?.length === 0 && (
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
