import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";
import { Profile } from "../../../store/type/Profile";
import ProfileTable from "../../Profile/Table";

const mockProfileData: Profile = {
  id: "reg001",
  method: "Online",
  registrationDate: "2025-03-01",
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
      identityNumber: "123456789",
      address: "123 Đường ABC, TP.HCM",
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
        licenseTypeId: "B1",
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
        courseId: "course001",
      },
    },
  },
  scheduleInfor: [
    {
      id: "schedule001",
      courseId: "course001",
      typeOfLicense: "B1",
      type: "LyThuyet",
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

const Expiredlicense = () => {
  const [profileId, setProfileId] = useState<string>("");
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isProfileIdValid, setIsProfileIdValid] = useState<boolean>(true);

  // Check if profileId exists in data
  const handleCheckProfileId = () => {
    // Simulate checking profileId against existing data
    if (profileId === mockProfileData.id) {
      console.log("Profile ID is valid", profileId);
      setIsProfileIdValid(true); // Valid ID
      setProfileData(mockProfileData); // Set profile data
    } else {
      console.log("Profile ID is invalid", profileId);
      setIsProfileIdValid(false); // Invalid ID
      // Dialog will not open because we're not setting isDialogOpen to true
    }
  };

  return (
    <div>
      <TabsContent value="renewal">
        <Card>
          <CardContent>
            {" "}
            <div className="ManageLicense-renewal-content">
              <div className="ManageLicense-renewal-header">
                <h1>Tra cứu giấy phép cần gia hạn</h1>
              </div>

              <div className="ManageLicense-renewal-search">
                <div className=" w-full flex flex-col gap-2">
                  <Input
                    placeholder="Nhập mã hồ sơ tại đây"
                    isForce={true}
                    onChange={(e) => setProfileId(e.target.value)}
                    className="w-full"
                  />
                  {!isProfileIdValid && (
                    <p className="error">* Mã hồ sơ không tồn tại.</p>
                  )}
                </div>
                <Button
                  text="TRA CỨU NGAY"
                  isPrimary={true}
                  onClick={handleCheckProfileId}
                />
              </div>
              {profileData && (
                <div className="ManageLicense-renewal-profile">
                  <p className="title">Xem thông tin hồ sơ tại đây:</p>
                  <ProfileTable profileData={profileData} isAdmin={false} />
                  <Button
                    text="Gia hạn giấy phép"
                    isPrimary={true}
                    onClick={handleCheckProfileId}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Expiredlicense;
