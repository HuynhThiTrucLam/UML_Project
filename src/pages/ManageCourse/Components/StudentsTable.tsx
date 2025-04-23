import { useState } from "react";
import Button from "../../../components/Button/Button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { mockStudents } from "../Tabs/ListStudentTab";
import { toast } from "sonner";
import axios from "axios";

interface StudentsTableProps {
  data: mockStudents[] | [];
  handlePrint: () => void;
  mode: "list" | "edit";
}

interface StudentScore {
  studentId: string;
  practiceScore: number;
  courseId?: string;
}

const StudentsTable = ({ data, handlePrint, mode }: StudentsTableProps) => {
  const [editedScores, setEditedScores] = useState<{
    [id: string]: { courseId?: string; practiceScore: number };
  }>({});

  const handleScoreChange = (id: string, value: string, courseId?: string) => {
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 10) {
      setEditedScores((prev) => ({
        ...prev,
        [id]: {
          courseId: courseId,
          practiceScore: numberValue,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    // Create array of student scores from editedScores
    const payload: StudentScore[] = Object.entries(editedScores).map(
      ([studentId, value]) => ({
        studentId: studentId,
        courseId: value.courseId,
        practiceScore: value.practiceScore,
      })
    );

    if (payload.length === 0) {
      toast.warning("Chưa có điểm nào được thay đổi", { duration: 3000 });
      return;
    }

    console.log("Submitting scores:", payload);
    // Here you would make your API call
    try {
      payload.forEach(async (element) => {
        await axios.put(
          import.meta.env.VITE_API_URL +
            `/api/students/registered/${element.studentId}`,
          {
            course_id: element.courseId,
            practical_score: element.practiceScore,
          }
        );
      });
      toast.success("Cập nhật điểm thành công!", {
        duration: 5000,
        className: "[&>[data-icon]]:!text-green-500",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          <Table className="File-table border-collapse">
            <TableCaption className="File-caption mb-2">
              <p> Bảng danh sách học viên</p>
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-50 border border-gray-200">
                <TableHead className="text-center border">STT</TableHead>
                <TableHead className="text-center border">
                  Mã học viên
                </TableHead>
                <TableHead className="text-center border">
                  Tên học viên
                </TableHead>
                <TableHead className="text-center border">
                  Điểm thi lý thuyết
                </TableHead>
                <TableHead className="text-center border">
                  Điểm thi thực hành
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student, index) => (
                <TableRow key={index} className="border hover:bg-gray-100">
                  <TableCell className="text-center border">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center border">
                    {student.id.split("-")[1]}
                  </TableCell>
                  <TableCell className="text-center border">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-center border">
                    {student.theoryScore}
                  </TableCell>
                  <TableCell className="text-center border">
                    {mode === "edit" ? (
                      <input
                        type="number"
                        max={10}
                        className="w-20 px-2 py-1 border rounded text-center"
                        defaultValue={student.practiceScore}
                        onChange={(e) =>
                          handleScoreChange(
                            student.id,
                            e.target.value,
                            student.courseId
                          )
                        }
                      />
                    ) : (
                      student.practiceScore
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={mode === "edit" ? 6 : 5}
                    className="text-center py-4"
                  >
                    Không có học viên nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {mode === "edit" && data.length !== 0 && (
            <div className="grid grid-cols-2 gap-4 justify-end mt-4">
              <Button
                text={"In danh sách"}
                isPrimary={false}
                onClick={handlePrint}
              />
              <Button text={"Lưu điểm"} isPrimary onClick={handleSubmit} />
            </div>
          )}
          {mode === "list" && data.length !== 0 && (
            <Button text={"In danh sách"} isPrimary onClick={handlePrint} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTable;
