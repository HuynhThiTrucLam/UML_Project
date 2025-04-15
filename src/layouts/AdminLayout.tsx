import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { AdminSidebar } from "../components/Sidebar/AdminSidebar";
import "./AdminLayout.scss";
import ManageCourse from "../pages/ManageCourse/ManageCourse";
import ManageLicense from "../pages/ManageLicense/ManageLicense";
import ManageExam from "../pages/ManageExam/ManageExam";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-right">
        <HeaderAdmin />
        <div className="admin-main">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-course" element={<ManageCourse />} />
            <Route path="manage-licenses" element={<ManageLicense />} />
            <Route path="manage-exam" element={<ManageExam />} />
            {/* Other routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
