import { CourseType } from "./Course";
import { HealthCheckType } from "./HealthCheck";

export interface PersonalData {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  licenseType: string;
  email?: string;
  healthCheckDocURL: string;
}

export interface PersonalImgData {
  avatar: string;
  cardImgFront: string;
  cardImgBack: string;
}

export interface ChooseDataType {
  courseId: string;
  healthCheckId: string;
}

export interface ChooseData {
  course: CourseType;
  healthCheck: HealthCheckType;
}

// Đây là data đưa cho BE
export interface StudentType {
  personalData: PersonalData; // Thông tin cá nhân
  personalImgData: PersonalImgData; // Thông tin ảnh cá nhân
  chooseData: ChooseDataType; // Thông tin lựa chọn
}

//Đây là data nhận về
export interface Student {
  personalData: PersonalData; // Thông tin cá nhân
  personalImgData: PersonalImgData; // Thông tin ảnh cá nhân
  chooseData: ChooseData; // Thông tin lựa chọn
}
