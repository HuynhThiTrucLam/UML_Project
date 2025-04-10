import { CourseType } from "../../store/type/Course";
import "./Course.scss";

export interface CourseProps {
  data: CourseType;
  isSelected?: boolean;
  onClick: (courseId: string) => void;
}

const Course = ({ data, isSelected = false, onClick }: CourseProps) => {
  return (
    <div
      className={`Course ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(data.id)}
    >
      <div className="Course-container">
        <p className="Course-heading">{data.name}</p>
        <p>Ngày thi dự kiến: {data.examDate}</p>
        <p>
          Thời hạn đăng ký: {data.startDate} - {data.endDate}
        </p>
        <p>
          Số lượng đã đăng ký: {data.registeredCount}/{data.maxStudents}
        </p>
      </div>
    </div>
  );
};

export default Course;
