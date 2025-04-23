export interface LicenseType {
  id: string;
  name: string;
}

export interface License {
  id: string;
  licenseNumber: string;
  typeOfLicense: LicenseType;
  studentId: string;
  createdAt: string;
  expirationDate: string;
  courseId: string;
  status: string; //(active, expired, suspended, revoked);
}
