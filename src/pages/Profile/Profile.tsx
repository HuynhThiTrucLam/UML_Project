import SearchIcon from "../../assets/icons/Search.tsx";
import Button from "../../components/Button/Button.tsx";
import Input from "../../components/Input/Input.tsx";
import "./Profile.scss";

import { useState } from "react";
import { Profile } from "../../store/type/Profile.tsx";
import ProfileTable from "./Table.tsx";
import axios from "axios";

// const mockProfileData: Profile = {
//   id: "reg001",
//   method: "Online",
//   registrationDate: "2025-03-01",
//   approvedDate: "",
//   rejectedDate: "",
//   registrationMethod: "Online",
//   status: "pending",
//   studentInfor: {
//     personalData: {
//       name: "Nguyễn Văn A",
//       phone: "0909123456",
//       gender: "Nam",
//       birthDate: "2000-01-15",
//       licenseType: "B1",
//       email: "vana@gmail.com",
//       healthCheckDocURL: "",
//     },
//     personalImgData: {
//       avatar: "/avatars/a.png",
//       cardImgFront: "/cards/front_a.png",
//       cardImgBack: "/cards/back_a.png",
//     },
//     chooseData: {
//       course: {
//         id: "course001",
//         name: "Khóa học B1 - Sáng",
//         typeOfLicense: {
//           id: "B1",
//           name: "Giấy phép hạng B1",
//         },
//         examDate: "2025-05-20",
//         startDate: "2025-04-30",
//         endDate: "2025-05-30",
//         registeredCount: 15,
//         maxStudents: 30,
//       },
//       healthCheck: {
//         id: "1",
//         name: "Khám sức khỏe tổng quát",
//         date: "2025-06-15",
//         address: "Bệnh viện ABC, Đường XYZ, TP.HCM",
//       },
//     },
//   },
//   scheduleInfor: [
//     {
//       id: "schedule001",
//       courseId: "course001",
//       type: "LyThuyet",
//       date: "2025-04-30",
//       startTime: "08:00",
//       endTime: "10:00",
//       location: "Phòng học A1",
//       teacher: "Nguyễn Văn T",
//     },
//     {
//       id: "schedule002",
//       courseId: "course001",
//       type: "ThucHanh",
//       date: "2025-05-02",
//       startTime: "08:00",
//       endTime: "10:00",
//       location: "Phòng học A1",
//       teacher: "Nguyễn Văn T",
//     },
//   ],
//   scoreOverall: "",
//   receiveDate: "",
//   location: "",
// };

// const mockOTP = {
//   profileId: "reg001",
//   otpCode: "1234",
// };

const File = () => {
  const [profileId, setProfileId] = useState<string>("");
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isProfileIdValid, setIsProfileIdValid] = useState<boolean>(true);

  // Check if profileId exists in data
  const handleCheckProfileId = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          `/api/course_registration/identity_number/${profileId}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log(data);

        const profileData = {
          id: data.id,
          method: data.method,
          registrationDate: data.registration_date,
          status: data.status,
          studentInfor: {
            personalData: {
              name: data.personal_doc.full_name,
              identityNumber: data.personal_doc.identity_number,
              address: data.personal_doc.address,
              phone: data.personal_doc.phone_number,
              gender: data.personal_doc.gender,
              birthDate: data.personal_doc.date_of_birth,
              licenseType: data.course.license_type_id,
              email: data.personal_doc.email,
              healthCheckDocURL: data.health_check_doc.document,
            },
            personalImgData: {
              avatar: data.personal_doc.avatar,
              cardImgFront: data.personal_doc.identity_img_front,
              cardImgBack: data.personal_doc.identity_img_back,
            },
            chooseData: {
              course: {
                id: data.course.id,
                name: data.course.course_name,
                licenseTypeId: data.course.license_type_id,
                examDate: "2025-05-20",
                startDate: data.course.start_date,
                endDate: data.course.end_date,
                registeredCount: data.course.current_students,
                maxStudents: data.course.max_students,
              },
              healthCheck: {
                id: data.health_check_doc.id,
                name: data.health_check_doc.health_check.description,
                date: data.health_check_doc.health_check.scheduled_datetime,
                address: data.health_check_doc.health_check.address,
                courseId: data.health_check_doc.health_check.course_id,
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
        console.info(profileData);
        setProfileData(profileData);
        setIsProfileIdValid(true);
      } else {
        setIsProfileIdValid(false);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsProfileIdValid(false);
    }
  };

  return (
    <div className="File">
      <div className="File-container">
        <div className="File-landing">
          <div className="File-header">
            <SearchIcon />
            <h1 className="File-title">Tra cứu hồ sơ</h1>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className="File-search">
            <div className=" w-full flex flex-col gap-2">
              <Input
                placeholder="Nhập số CCCD/CMND/Hộ chiếu"
                isForce={true}
                onChange={(e) => setProfileId(e.target.value)}
                className="w-full"
              />
              {!isProfileIdValid && (
                <p className="error">* Mã hồ sơ không tồn tại.</p>
              )}
            </div>

            {/* Removed AlertDialogTrigger and just using Button */}
            <Button
              text="TRA CỨU NGAY"
              isPrimary={true}
              onClick={handleCheckProfileId}
            />
          </div>
        </div>
        {profileData && (
          <div className="File-profile">
            <p className="title">Xem thông tin hồ sơ tại đây:</p>
            <ProfileTable profileData={profileData} isAdmin={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
