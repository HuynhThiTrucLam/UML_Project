import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Profile } from "../../../store/type/Profile";
import ProfileTable from "../../Profile/Table";
interface RegisterateDetailProps {
  registerID: string;
}

const mockProfileData: Profile = {
  id: "reg001",
  method: "Online",
  registrationDate: "2025-03-01",
  approvedDate: "",
  rejectedDate: "",
  registrationMethod: "Online",
  status: "pending",
  studentInfor: {
    personalData: {
      name: "Nguyễn Văn A",
      phone: "0909123456",
      gender: "Nam",
      birthDate: "2000-01-15",
      licenseType: "B1",
      email: "vana@gmail.com",
      healthCheckDocURL: "",
    },
    personalImgData: {
      avatar: "/avatars/a.png",
      cardImgFront: "/cards/front_a.png",
      cardImgBack: "/cards/back_a.png",
    },
    chooseData: {
      course: {
        id: "course001",
        name: "Khóa học B1 - Sáng",
        typeOfLicense: "B1",
        examDate: "2025-05-20",
        startDate: "2025-04-30",
        endDate: "2025-05-30",
        registeredCount: 15,
        maxStudents: 30,
      },
      healthCheck: {
        id: "1",
        name: "Khám sức khỏe tổng quát",
        date: "2025-06-15",
        address: "Bệnh viện ABC, Đường XYZ, TP.HCM",
      },
    },
  },
  scheduleInfor: [
    {
      id: "schedule001",
      courseId: "course001",
      type: "LyThuyet",
      typeOfLicense: "B1",
      date: "2025-04-30",
      startTime: "08:00",
      endTime: "10:00",
      location: "Phòng học A1",
      teacher: "Nguyễn Văn T",
    },
    {
      id: "schedule002",
      courseId: "course001",
      typeOfLicense: "B1",
      type: "ThucHanh",
      date: "2025-05-02",
      startTime: "08:00",
      endTime: "10:00",
      location: "Phòng học A1",
      teacher: "Nguyễn Văn T",
    },
  ],
  scoreOverall: "",
  receiveDate: "",
  location: "",
};

const RegisterateDetail = ({ registerID }: RegisterateDetailProps) => {
  const [data, setData] = useState<Profile | undefined>();
  useEffect(() => {
    //Get Registeration data by ID from API
    console.log("Get Registeration data by ID from API ", registerID);
    setData(mockProfileData);
  }, []);

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <p className="text-blue-600 underline cursor-pointer">Xem chi tiết</p>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-max max-w-none border border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle>Thông tin hồ sơ học viên</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="w-max max-w-none max-h-[70vh] overflow-auto">
            {data && (
              <ProfileTable profileData={data} isAdmin={true}></ProfileTable>
            )}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegisterateDetail;
