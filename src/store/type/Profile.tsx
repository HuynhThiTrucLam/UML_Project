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

//       "id": "string",
// "health_check_doc": {
//   "student_id": "string",
//   "health_check_id": "string",
//   "document": "string",
//  "health_check": {
//       "course_id": "123e4567-e89b-12d3-a456-426614174000",
//       "address": "123 Main St, City, Country",
//       "scheduled_datetime": "2025-05-01T10:00:00Z",
//       "description": "Annual health check",
//       "status": "scheduled",
//       "created_at": "2025-04-20T16:13:13.459Z",
//       "updated_at": "2025-04-20T16:13:13.459Z",
//       "id": "string"
//     }
//   "status": "string",
//   "id": "string",
//   "created_at": "2025-04-20T15:22:56.261Z",
//   "updated_at": "2025-04-20T15:22:56.261Z"
// },
// "course": {
//   "course_name": "B1 Driving Course",
//   "license_type_id": "123e4567-e89b-12d3-a456-426614174000",
//   "start_date": "2025-05-01",
//   "end_date": "2025-06-30",
//   "max_students": 30,
//   "price": 5000000,
//   "status": "active",
//   "id": "string",
//   "current_students": 0,
//   "created_at": "2025-04-20",
//   "updated_at": "2025-04-20"
// },
// "personal_doc": {
//   "user_id": "string",
//   "full_name": "string",
//   "date_of_birth": "2025-04-20",
//   "gender": "string",
//   "address": "string",
//   "phone_number": "string",
//   "email": "string",
//   "identity_number": "string",
//   "identity_img_front": "string",
//   "identity_img_back": "string",
//   "avatar": "string",
//   "id": "string",
//   "created_at": "2025-04-20T15:22:56.261Z",
//   "updated_at": "2025-04-20T15:22:56.261Z"
// },
// "student": {
//   "user_id": "string",
//   "id": "string",
//   "created_at": "2025-04-20T15:22:56.261Z"
// },
// "status": "string",
// "created_at": "string",
// "updated_at": "string",
// "note": "string"
