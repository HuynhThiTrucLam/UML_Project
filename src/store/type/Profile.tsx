import { ScheduleType } from "./ScheduleItem";
import { Student } from "./Student";

export interface Profile {
  id: string;
  method: string; // (Online, Offline)
  registrationDate: string;
  // registrationMethod: string;
  status: string; //(pending, approved, payment, successful, rejected)
  studentInfor: Student;
  scheduleInfor: ScheduleType[];

  scoreOverall: string;
  receiveDate: string;
  location: string;
}
