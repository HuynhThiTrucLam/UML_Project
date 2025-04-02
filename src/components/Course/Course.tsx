import { CourseProps } from "../../store/type/CourseType";
import "./Course.scss";

const Course = (courseData: CourseProps) => {
  return (
    <div className="Course">
      <div className="Course-container">
        <p className="Course-heading">{courseData.data.name}</p>
        <p>Ngày thi dự kiến: {courseData.data.examDate}</p>
        <p>Thời hạn đăng ký: {courseData.data.registrationDeadline}</p>
        <p>
          Số lượng đã đăng ký: {courseData.data.registeredCount}/
          {courseData.data.maxStudents}
        </p>
        {/* Add more classes as needed */}
      </div>
    </div>
  );
};

export default Course;
