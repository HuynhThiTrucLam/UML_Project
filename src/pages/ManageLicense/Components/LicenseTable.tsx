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

  const retriveLicenses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/license_type/?skip=0&limit=100`
      );
      const data = response.data.items;

      // {
      //   "type_name": "Hạng bằng lái A1",
      //   "age_requirement": "Đủ 18 tuổi trở lên",
      //   "health_requirements": "Để đủ điều kiện tham gia kỳ thi sát hạch cấp giấy phép lái xe hạng A1 (dành cho xe mô tô hai bánh có dung tích xi-lanh dưới 175 cm³), người dự thi bắt buộc phải đáp ứng các tiêu chuẩn sức khỏe theo quy định hiện hành của Bộ Y tế và Bộ Giao thông Vận tải. Việc kiểm tra sức khỏe này nhằm đảm bảo người lái xe có đủ khả năng về thể chất và tinh thần để điều khiển phương tiện một cách an toàn, không gây nguy hiểm cho bản thân và những người tham gia giao thông khác. Các yêu cầu chính bao gồm tình trạng ổn định về tâm thần kinh (không mắc các bệnh tâm thần cấp tính, động kinh, hoặc các rối loạn có thể ảnh hưởng đến khả năng kiểm soát hành vi), thị lực đảm bảo (đạt mức tối thiểu theo quy định, kể cả khi sử dụng kính điều chỉnh), chức năng vận động của tay, chân đủ để thực hiện các thao tác điều khiển xe (tay lái, phanh, ga...), không bị các dị tật hoặc bệnh lý nghiêm trọng về tim mạch, hô hấp có thể gây ra tình trạng mất kiểm soát đột ngột khi đang lái xe. Ngoài ra, người lái xe không được nghiện các chất kích thích, ma túy. Việc khám sức khỏe phải được thực hiện tại các cơ sở y tế được cấp phép và kết quả khám (Giấy khám sức khỏe dành cho người lái xe) còn hiệu lực là một phần hồ sơ bắt buộc khi đăng ký dự thi bằng lái A1.",
      //   "training_duration": 2,
      //   "fee": 1699000,
      //   "id": "2533a434-35c7-47fa-9306-8e45da5ec3b4"
      // },
      const licenses = data.map((license: any) => ({
        id: license.id,
        typeOfLicense: {
          id: license.id,
          name: license.type_name,
        },
        studentId: license.studentId,
        releaseDate: license.releaseDate,
        endDate: license.endDate,
        expiredDate: license.expiredDate,
        status: license.status,
      }));
      setLicenses(licenses);
    } catch (error) {
      console.error("Error fetching licenses:", error);
    }
  };

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
