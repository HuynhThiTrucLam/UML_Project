import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Profile } from "../../store/type/Profile";

const ProfileTable = ({ profileData }: { profileData: Profile }) => {
  return (
    <div>
      <Table className="File-table border-collapse">
        <TableCaption className="File-caption">
          Bảng thông tin hồ sơ
        </TableCaption>
        <TableHeader>
          <TableRow className="border border-gray-200">
            <TableHead className="w-[100px] text-center border border-gray-200">
              Mã hồ sơ
            </TableHead>
            <TableHead className="text-center border border-gray-200">
              Thông tin hồ sơ
            </TableHead>
            <TableHead className="text-center border border-gray-200">
              Trạng thái
            </TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border border-gray-200">
            <TableCell className="font-medium border border-gray-200 text-center">
              {profileData.id}
            </TableCell>
            <TableCell className="File-table-content border-b border-gray-200 text-center">
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Tên học viên: </p>
                  <p>{profileData.studentName}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Số điện thoại: </p>
                  <p>{profileData.phoneNumber}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Ngày khám sức khoẻ: </p>
                  <p>{profileData.healthCheckDate}</p>
                </div>
              </div>
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Lớp đăng ký: </p>
                  <p>{profileData.className}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Loại bằng lái: </p>
                  <p>{profileData.typeOfLicense}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Giáo viên: </p>
                  <p>{profileData.teacherName}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Thời gian học: </p>
                  <p>
                    {profileData.startDate} - {profileData.endDate}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Thời gian thi: </p>
                  <p>{profileData.examDate}</p>
                </div>
              </div>
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Kết quả thi: </p>
                  <p>{profileData.scoreOverall}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Thời gian nhận bằng: </p>
                  <p>{profileData.receiveDate}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Địa điểm : </p>
                  <p>{profileData.location}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="border border-gray-200 text-center">
              <div className="File-table-status">{profileData.status}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfileTable;
