// import { useState } from "react";
// import Button from "../../../components/Button/Button";
// import Input from "../../../components/Input/Input";
// import Selection from "../../../components/Select/Select";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../../../components/ui/alert-dialog";
// import { CourseType } from "../../../store/type/Course";

// interface CourseDialogProps {
//   mode: "add" | "edit";
//   initialData?: CourseType;
// }

// const formatDate = (dateString?: string) =>
//   dateString ? dateString.split("T")[0] : "";

// const useCourseForm = (initialData?: CourseType) => {
//   const [name, setName] = useState(initialData?.name || "");
//   const [type, setType] = useState<string>(
//     initialData?.licenseTypeId.toString() || ""
//   );
//   const [startDate, setStartDate] = useState(
//     formatDate(initialData?.startDate)
//   );
//   const [endDate, setEndDate] = useState(formatDate(initialData?.endDate));
//   const [maxStudents, setMaxStudents] = useState(
//     initialData?.maxStudents?.toString() || ""
//   );
//   // const [theoryLessons, setTheoryLessons] = useState(
//   //   initialData?.theoryLessons?.toString() || ""
//   // );
//   // const [practiceLessons, setPracticeLessons] = useState(
//   //   initialData?.practiceLessons?.toString() || ""
//   // );

//   const handleSetType = (value: any) => {
//     // If value is an object with an id property, use that
//     if (value && typeof value === "object" && value.id) {
//       setType(value.id);
//     } else {
//       // Otherwise use the value directly (assuming it's a string)
//       setType(value);
//     }
//   };

//   const hasChanged = (): boolean => {
//     if (!initialData) return false;

//     return (
//       name !== initialData.name ||
//       type !== initialData.typeOfLicense.id ||
//       startDate !== formatDate(initialData.startDate) ||
//       endDate !== formatDate(initialData.endDate) ||
//       parseInt(maxStudents) !== initialData.maxStudents ||
//       parseInt(theoryLessons) !== initialData.theoryLessons ||
//       parseInt(practiceLessons) !== initialData.practiceLessons
//     );
//   };

//   const getFormData = () => ({
//     name,
//     type,
//     startDate,
//     endDate,
//     maxStudents: parseInt(maxStudents) || 0,
//     theoryLessons: parseInt(theoryLessons) || 0,
//     practiceLessons: parseInt(practiceLessons) || 0,
//   });

//   return {
//     fields: {
//       name,
//       type,
//       startDate,
//       endDate,
//       maxStudents,
//       theoryLessons,
//       practiceLessons,
//     },
//     setters: {
//       setName,
//       setType: handleSetType,
//       setStartDate,
//       setEndDate,
//       setMaxStudents,
//       setTheoryLessons,
//       setPracticeLessons,
//     },
//     hasChanged,
//     getFormData,
//   };
// };

// const CourseDialog = ({ mode, initialData }: CourseDialogProps) => {
//   const { fields, setters, hasChanged, getFormData } =
//     useCourseForm(initialData);

//   const handleSubmit = () => {
//     const courseData = getFormData();

//     if (mode === "add") {
//       console.log("Adding course:", courseData);
//     } else {
//       if (!hasChanged()) {
//         alert("Bạn chưa thay đổi thông tin nào.");
//         return;
//       }
//       if (!initialData?.id) {
//         console.error("Missing course ID for editing.");
//         return;
//       }
//       console.log("Updating course:", { ...courseData, id: initialData.id });
//     }
//   };

//   return (
//     <div className="ManageCourse-addnew">
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button
//             text={mode === "add" ? "Thêm khoá học mới" : "Sửa"}
//             isPrimary
//           />
//         </AlertDialogTrigger>

//         <AlertDialogContent className="w-[1024px] max-w-none border">
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {mode === "add"
//                 ? "Điền thông tin khoá học tại đây"
//                 : `Bạn đang chỉnh sửa khoá học ${initialData?.name}`}
//             </AlertDialogTitle>
//           </AlertDialogHeader>

//           <AlertDialogDescription className="ManageCourse-addnew-content w-max max-w-none max-h-[70vh] overflow-auto">
//             <div className="ManageCourse-addnew-select">
//               <p>Hạng bằng lái</p>
//               <Selection
//                 data={typeOfLicense}
//                 placeholder="Chọn loại bằng lái"
//                 setData={setters.setType}
//                 value={fields.type.toString()}
//               />
//             </div>

//             <Input
//               label="Tên khoá học"
//               placeholder="Điền tên khoá học"
//               onChange={(e) => setters.setName(e.target.value)}
//               value={fields.name}
//             />

//             <Input
//               label="Số lượng học viên tối đa"
//               placeholder="Điền số lượng học viên tối đa"
//               onChange={(e) => setters.setMaxStudents(e.target.value)}
//               value={fields.maxStudents}
//             />

//             <div className="flex gap-2">
//               <Input
//                 label="Số buổi học lý thuyết"
//                 placeholder="VD: 02"
//                 onChange={(e) => setters.setTheoryLessons(e.target.value)}
//                 value={fields.theoryLessons}
//               />
//               <Input
//                 label="Số buổi học thực hành"
//                 placeholder="VD: 02"
//                 onChange={(e) => setters.setPracticeLessons(e.target.value)}
//                 value={fields.practiceLessons}
//               />
//             </div>

//             <Input
//               label="Thời gian bắt đầu"
//               placeholder="YYYY-MM-DD"
//               onChange={(e) => setters.setStartDate(e.target.value)}
//               value={fields.startDate}
//             />

//             <Input
//               label="Thời gian kết thúc"
//               placeholder="YYYY-MM-DD"
//               onChange={(e) => setters.setEndDate(e.target.value)}
//               value={fields.endDate}
//             />
//           </AlertDialogDescription>

//           <AlertDialogFooter className="ManageCourse-addnew-footer">
//             <AlertDialogCancel>Thoát</AlertDialogCancel>
//             <Button
//               text={mode === "add" ? "Thêm khoá học" : "Cập nhật khoá học"}
//               isPrimary
//               onClick={handleSubmit}
//             />
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default CourseDialog;
