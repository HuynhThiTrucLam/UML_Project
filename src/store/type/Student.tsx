import { CourseType } from "./Course";
import { HealthCheckType } from "./HealthCheck";

export interface PersonalData {
  name: string;
  identityNumber: string;
  address: string;
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

export interface ChooseData {
  course: CourseType;
  healthCheck: HealthCheckType;
}

//Đây là data nhận về
export interface Student {
  personalData: PersonalData; // Thông tin cá nhân
  personalImgData: PersonalImgData; // Thông tin ảnh cá nhân
  chooseData: ChooseData; // Thông tin lựa chọn
}
