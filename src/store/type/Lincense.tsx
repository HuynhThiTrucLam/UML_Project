export interface LicenseType {
  id: string;
  name: string;
}

export interface License {
  id: string;
  typeOfLicense: LicenseType;
  studentId: String;
  releaseDate: string;
  endDate: string;
  expiredDate: string;
  status: string; //(active, expired, suspended, revoked);
}
