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
import "./Profile.scss"; // Create this file for custom styles

interface ProfileTableProps {
  profileData: Profile;
  isAdmin: boolean;
}

const ProfileTable = ({ profileData, isAdmin }: ProfileTableProps) => {
  return (
    <div
      className={`profile-table-container ${
        isAdmin ? "admin-view" : "user-view"
      }`}
    >
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
            <TableCell
              className={`File-table-content border-b border-gray-200 text-center ${
                isAdmin ? "admin-grid" : ""
              }`}
            >
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Tên học viên: </p>
                  <p>{profileData.studentInfor.personalData.name}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Số điện thoại: </p>
                  <p>{profileData.studentInfor.personalData.phone}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Ngày khám sức khoẻ: </p>
                  <p>{profileData.studentInfor.chooseData.healthCheck.date}</p>
                </div>
                {isAdmin && (
                  <>
                    <div className="flex gap-[8px]">
                      <p className="title">Ảnh chân dung: </p>
                      <p>{profileData.studentInfor.personalImgData.avatar}</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <p className="title">Ảnh CCCD mặt trước: </p>
                      <p>
                        {profileData.studentInfor.personalImgData.cardImgFront}
                      </p>
                    </div>
                    <div className="flex gap-[8px]">
                      <p className="title">Ảnh CCCD mặt sau: </p>
                      <p>
                        {profileData.studentInfor.personalImgData.cardImgBack}
                      </p>
                    </div>
                    <div className="flex gap-[8px]">
                      <p className="title">File khám sức khoẻ: </p>
                      <p>
                        {profileData.studentInfor.personalData
                          .healthCheckDocURL === ""
                          ? "Không có"
                          : profileData.studentInfor.personalData
                              .healthCheckDocURL}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Lớp đăng ký: </p>
                  <p>{profileData.studentInfor.chooseData.course.name}</p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Loại bằng lái: </p>
                  <p>
                    {String(
                      profileData.studentInfor.chooseData.course.typeOfLicense
                    )}
                  </p>
                </div>

                <div className="flex gap-[8px]">
                  <p className="title">Thời gian học: </p>
                  <p>
                    {profileData.studentInfor.chooseData.course.startDate} -{" "}
                    {profileData.studentInfor.chooseData.course.endDate}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Thời gian thi: </p>
                  <p>{profileData.studentInfor.chooseData.course.examDate}</p>
                </div>
                {isAdmin && (
                  <>
                    <div className="flex gap-[8px]">
                      <p className="title">Lớp lý thuyết: </p>
                      <p>
                        {profileData.scheduleInfor
                          .filter((schedule) => schedule.type === "LyThuyet")
                          .map((schedule) => (
                            <div key={schedule.id}>
                              {schedule.startTime} - {schedule.endTime}
                              {" ngày "}
                              {schedule.date}
                              {" tại "}
                              {schedule.location}
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="flex gap-[8px]">
                      <p className="title">Lớp thực hành: </p>
                      <p>
                        {profileData.scheduleInfor
                          .filter((schedule) => schedule.type === "ThucHanh")
                          .map((schedule) => (
                            <div key={schedule.id}>
                              {schedule.startTime} - {schedule.endTime}
                              {" ngày "}
                              {schedule.date}
                              {" tại "}
                              {schedule.location}
                            </div>
                          ))}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="File-table-item">
                <div className="flex gap-[8px]">
                  <p className="title">Kết quả thi: </p>
                  <p>
                    {profileData.scoreOverall === ""
                      ? "Không có"
                      : profileData.scoreOverall}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Thời gian nhận bằng: </p>
                  <p>
                    {profileData.receiveDate === ""
                      ? "không có"
                      : profileData.receiveDate}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <p className="title">Địa điểm : </p>
                  <p>
                    {profileData.location === ""
                      ? "Khônng có"
                      : profileData.location}
                  </p>
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
