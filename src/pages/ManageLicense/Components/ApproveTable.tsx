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
// import { mockRegistrations } from "../../../store/type/Profile";
import RegisterateDetail from "../../AdminDashboard/Detail/RegisterateDetail";

const ApproveTable = () => {
  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin các hồ sơ đủ điều kiện cấp giấy phép
            </TableCaption>
            <TableHeader className="ManageProfile-approve-header">
              <TableRow className=" ManageProfile-approve-header border border-gray-200">
                <TableHead className="ManageProfile-approve-text w-[100px] text-center border border-gray-200">
                  Mã hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Mã học viên
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Mã khoá học
                </TableHead>
                <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                  Ngày tạo hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                  Ngày hoàn thành học
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Trạng thái
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Chi tiết hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {mockRegistrations.map((license) => (
                <TableRow key={license.id} className="border">
                  <TableCell className="text-center border">
                    {license.id}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.studentInfor.personalData.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {license.studentInfor.chooseData.course.id}
                  </TableCell>

                  <TableCell className="text-center border">
                    {license.registrationDate}
                  </TableCell>
                  <TableCell className="text-center border">
                    {new Date(
                      license.studentInfor.chooseData.course.endDate
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
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

                  <TableCell className="text-center border border-gray-200">
                    <RegisterateDetail
                      registerID={license.id}
                    ></RegisterateDetail>
                  </TableCell>
                  <TableCell className="flex gap-2 text-center border">
                    <Button
                      text="Từ chối"
                      isPrimary={false}
                      onClick={() => {}}
                    />
                    <Button text="Duyệt" isPrimary={true} onClick={() => {}} />
                  </TableCell>
                </TableRow>
              ))}
              {mockRegistrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Không có khoá học nào phù hợp.
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApproveTable;
