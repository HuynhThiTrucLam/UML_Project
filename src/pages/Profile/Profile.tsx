import SearchIcon from "../../assets/icons/Search.tsx";
import Button from "../../components/Button/Button.tsx";
import Input from "../../components/Input/Input.tsx";
import "./Profile.scss";

import { useState } from "react";
import ResendIcon from "../../assets/icons/Resend.tsx";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog.tsx";
import { InputOTP, InputOTPSlot } from "../../components/ui/input-otp.tsx";
import { Profile } from "../../store/type/Profile.tsx";
import ProfileTable from "./Table.tsx";

const mockProfileData: Profile = {
  // Profile identification
  id: "1A2B3C",
  status: "Chờ nhận bằng", // Waiting for certificate

  studentName: "John Doe",
  phoneNumber: "123456789",
  healthCheckDate: "2025-04-01",
  className: "Class A",
  typeOfLicense: "B1",
  teacherName: "Jane Smith",
  startDate: "2025-04-01",
  endDate: "2025-06-01",
  examDate: "2025-06-15",
  receiveDate: "",
  location: "",
  scoreOverall: "Đạt", // Passed
};

const mockOTP = {
  profileId: "reg001",
  otpCode: "1234",
};

const File = () => {
  const [profileId, setProfileId] = useState<string>("");
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [OTPCode, setOTPCode] = useState<string>("");
  const [invalidOTP, setInvalidOTP] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isProfileIdValid, setIsProfileIdValid] = useState<boolean>(true);

  // Check if profileId exists in data
  const handleCheckProfileId = () => {
    // Simulate checking profileId against existing data
    if (profileId === mockProfileData.id) {
      console.log("Profile ID is valid", profileId);
      setIsProfileIdValid(true); // Valid ID
      setIsDialogOpen(true); // Open dialog only if valid
    } else {
      console.log("Profile ID is invalid", profileId);
      setIsProfileIdValid(false); // Invalid ID
      // Dialog will not open because we're not setting isDialogOpen to true
    }
  };

  const handleSubmitOTP = () => {
    if (OTPCode === mockOTP.otpCode) {
      console.log("OTP is correct", OTPCode);
      setInvalidOTP(false); // Reset invalid OTP state
      setIsDialogOpen(false); // Close dialog after valid OTP
      setProfileData(mockProfileData); // Set profile data
    } else {
      setInvalidOTP(true); // Invalid OTP
      setOTPCode(""); // Clear OTP input
    }
  };

  // Simulate resending OTP
  const handleResendOTP = () => {
    console.log("Resending OTP");
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
                placeholder="Nhập mã hồ sơ tại đây"
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

          {/* Dialog is controlled entirely by the isDialogOpen state */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác thực danh tính</AlertDialogTitle>
                <AlertDialogDescription className="Identity">
                  <div className="flex flex-col gap-6">
                    Vui lòng nhập 4 mã số đã gửi đến số điện thoại chính chủ của
                    bạn để tiến hành xác thực danh tính.
                    <InputOTP
                      maxLength={4}
                      value={OTPCode}
                      onChange={setOTPCode}
                    >
                      {[...Array(4)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTP>
                    {invalidOTP && (
                      <p className="text-[red]">Mã OTP bạn nhập không đúng</p>
                    )}
                    <div className="flex gap-1 align-center">
                      <ResendIcon />
                      <p className="File-resend" onClick={handleResendOTP}>
                        Gửi lại mã
                      </p>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Thoát</AlertDialogCancel>
                <div className="File-action">
                  <Button
                    text="Xác nhận"
                    isPrimary={true}
                    onClick={handleSubmitOTP}
                  />
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {profileData && (
          <div className="File-profile">
            <p className="title">Xem thông tin hồ sơ tại đây:</p>
            <ProfileTable profileData={profileData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
