import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { AdminSidebar } from "../components/Sidebar/AdminSidebar";
import "./AdminLayout.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-right">
        <HeaderAdmin />
        <div className="admin-main">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Other routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
