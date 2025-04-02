export interface PersonalData {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  licenseType: string;
  email?: string;
}

export interface PersonalImgData {
  avatar: string;
  cardImgFront: string;
  cardImgBack: string;
}

export interface ChooseData {
  courseId: string;
  healthCheckId: string;
}

export interface StudentType {
  personalData: PersonalData; // Thông tin cá nhân
  personalImgData: PersonalImgData; // Thông tin ảnh cá nhân
  chooseData: ChooseData; // Thông tin lựa chọn
}
