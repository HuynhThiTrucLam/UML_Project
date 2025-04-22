import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Profile } from "../../../store/type/Profile";
import ProfileTable from "../../Profile/Table";
interface RegisterateDetailProps {
  data: Profile;
}

const RegisterateDetail = ({ data }: RegisterateDetailProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <p className="text-blue-600 underline cursor-pointer">Xem chi tiết</p>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-max max-w-none border border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle>Thông tin hồ sơ học viên</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="w-max max-w-none max-h-[70vh] overflow-auto">
            {data && (
              <ProfileTable profileData={data} isAdmin={true}></ProfileTable>
            )}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegisterateDetail;
