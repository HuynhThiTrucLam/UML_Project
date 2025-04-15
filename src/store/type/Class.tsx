import { CourseType } from "./Course";

export interface TypeOfClass {
  id: string;
  name: string;
}

export interface ClassType {
  id: string;
  name: string;
  course: CourseType;
  date: string;
  startTime: string;
  endTime: string;
  type: TypeOfClass;
  location: string;
  teacher?: string;
  maxStudents: number;
}
