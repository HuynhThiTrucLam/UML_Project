import FilterArrow from "../../../assets/icons/FilterArrow";
import Button from "../../../components/Button/Button";
import SearchBar from "../../../components/Searchbar/SearchBar";
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
import RegisterateDetail from "../../AdminDashboard/Detail/RegisterateDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "../../../store/type/Profile";

// Example API response format
// [{
//   "id": 2,
//   "license_number": "DL-20250423-2C4B",
//   "license_type_id": "d64eb185-9581-4de8-b041-dd7a06449cf1",
//   "student_id": "5c0735a3-b965-443a-a301-290b10f4924d",
//   "created_at": "2025-04-23T01:58:18.104182",
//   "expiration_date": "2028-04-22T01:58:18.104182",
//   "status": "pending",
//   "course_id": "f8e16970-bf12-4485-96ff-c26ff787e04f",
//   "course_registration_date": "2025-04-21 19:14:19.482804"
// }]

interface License {
  id: number;
  license_number: string;
  license_type_id: string;
  student_id: string;
  created_at: string;
  expiration_date: string;
  status: string;
  course_id: string;
  course_registration_date: string;
  profileData?: Profile;
}

const ApproveTable = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileDetails, setProfileDetails] = useState<Record<string, Profile>>(
    {}
  );

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/api/licenses?status=pending"
        );
        setLicenses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching licenses:", err);
        setError("Failed to fetch license data");
        // For development, using mock data when API fails
        // Remove this in production
        setLicenses([
          {
            id: 2,
            license_number: "DL-20250423-2C4B",
            license_type_id: "d64eb185-9581-4de8-b041-dd7a06449cf1",
            student_id: "5c0735a3-b965-443a-a301-290b10f4924d",
            created_at: "2025-04-23T01:58:18.104182",
            expiration_date: "2028-04-22T01:58:18.104182",
            status: "pending",
            course_id: "f8e16970-bf12-4485-96ff-c26ff787e04f",
            course_registration_date: "2025-04-21 19:14:19.482804",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  useEffect(() => {
    // Fetch profile data for each license
    const fetchProfileData = async () => {
      const profiles: Record<string, Profile> = {};

      for (const license of licenses) {
        try {
          // Replace with your actual API endpoint to get profile by student ID
          const response = await axios.get(
            `/api/students/${license.student_id}/profile`
          );
          profiles[license.student_id] = response.data;
        } catch (error) {
          console.error(
            `Error fetching profile for student ${license.student_id}:`,
            error
          );
          // Create a mock profile for development
          const mockProfile = {
            id: String(license.id),
            name: "Học viên mẫu",
            method: "direct",
            registrationDate: license.created_at,
            status: "pending",
            studentInfor: {
              personalData: {
                name: "Học viên mẫu",
                identityNumber: "123456789",
                address: "123 Test Street",
                phone: "0123456789",
                gender: "male",
                dob: "2000-01-01",
                email: "test@example.com",
                image: "",
              },
              chooseData: {
                course: {
                  id: license.course_id,
                  endDate: license.course_registration_date,
                  name: "Khóa học mẫu",
                  licenseType: {
                    id: license.license_type_id,
                    type_name: "Hạng B1",
                  },
                  startDate: license.created_at,
                  registeredCount: 10,
                  price: 1000000,
                  details: "Chi tiết khóa học",
                },
              },
            },
            isSent: false,
            isCompleted: false,
            licenseId: String(license.id),
            licenseTypeId: license.license_type_id,
          };

          profiles[license.student_id] = mockProfile as unknown as Profile;
        }
      }

      setProfileDetails(profiles);
    };

    if (licenses.length > 0) {
      fetchProfileData();
    }
  }, [licenses]);

  const handleApprove = async (licenseId: number) => {
    try {
      // Replace with your actual API endpoint
      await axios.post(`/api/licenses/${licenseId}/approve`);
      // Refresh the list after approval
      const updatedLicenses = licenses?.map((license) =>
        license.id === licenseId ? { ...license, status: "active" } : license
      );
      setLicenses(updatedLicenses);
    } catch (err) {
      console.error("Error approving license:", err);
      setError("Failed to approve license");
    }
  };

  const handleReject = async (licenseId: number) => {
    try {
      // Replace with your actual API endpoint
      await axios.post(`/api/licenses/${licenseId}/reject`);
      // Refresh the list after rejection
      const updatedLicenses = licenses.map((license) =>
        license.id === licenseId ? { ...license, status: "revoked" } : license
      );
      setLicenses(updatedLicenses);
    } catch (err) {
      console.error("Error rejecting license:", err);
      setError("Failed to reject license");
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-2">
          {error && <div className="text-red-500 p-2 mb-2">{error}</div>}
          <Table className="File-table border-collapse">
            <TableCaption className="File-caption">
              Bảng thông tin các hồ sơ đủ điều kiện cấp giấy phép
            </TableCaption>
            <TableHeader className="ManageProfile-approve-header">
              <TableRow className=" ManageProfile-approve-header border border-gray-200">
                <TableHead className="ManageProfile-approve-text w-[100px] text-center border border-gray-200">
                  Mã hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Mã học viên
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Mã khoá học
                </TableHead>
                <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                  Ngày tạo hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text  text-center border border-gray-200">
                  Ngày hoàn thành học
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Trạng thái
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200">
                  Chi tiết hồ sơ
                </TableHead>
                <TableHead className="ManageProfile-approve-text text-center border border-gray-200"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : licenses.length > 0 ? (
                licenses.map((license) => (
                  <TableRow key={license.id} className="border">
                    <TableCell className="text-center border">
                      {license.license_number || license.id}
                    </TableCell>
                    <TableCell className="text-center border">
                      {license.student_id.split("-")[1]}
                    </TableCell>
                    <TableCell className="text-center border">
                      {license.course_id.split("-")[1]}
                    </TableCell>
                    <TableCell className="text-center border">
                      {new Date(license.created_at).toLocaleDateString(
                        "vi-VN",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-center border">
                      {new Date(
                        license.course_registration_date
                      ).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-center border">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                          license.status === "active"
                            ? "bg-green-100 text-green-800"
                            : license.status === "expired"
                            ? "bg-gray-100 text-gray-800"
                            : license.status === "suspended"
                            ? "bg-yellow-100 text-yellow-800"
                            : license.status === "revoked"
                            ? "bg-red-100 text-red-800"
                            : license.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                      >
                        {license.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center border border-gray-200">
                      {profileDetails[license.student_id] ? (
                        <RegisterateDetail
                          data={profileDetails[license.student_id]}
                        />
                      ) : (
                        <p>Loading profile...</p>
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2 text-center border">
                      <Button
                        text="Từ chối"
                        isPrimary={false}
                        onClick={() => handleReject(license.id)}
                      />
                      <Button
                        text="Duyệt"
                        isPrimary={true}
                        onClick={() => handleApprove(license.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Không có hồ sơ nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApproveTable;
