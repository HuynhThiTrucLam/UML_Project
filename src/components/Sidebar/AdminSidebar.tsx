import { NavLink } from "react-router-dom";
import ActiveArrow from "../../assets/icons/ActiveArrow";
import Complaint from "../../assets/icons/Complaint";
import Course from "../../assets/icons/Course";
import License from "../../assets/icons/License";
import Profile from "../../assets/icons/Profile";
import Logo from "../../assets/images/Logo-blue.png";
import TeamIcon from "../../assets/images/team.png";
import Button from "../Button/Button";
import "./AdminSidebar.scss";
import Employee from "../../assets/icons/Employee";
import ExamIcon from "../../assets/icons/Employee";

interface SidebarItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

export const AdminSidebar = () => {
  const sidebarItems: SidebarItem[] = [
    {
      path: "/admin/dashboard",
      icon: <Profile />,
      label: "Quản lý hồ sơ",
    },
    {
      path: "/admin/manage-course",
      icon: <Course />,
      label: "Quản lý lớp học",
    },
    {
      path: "/admin/manage-exam",
      icon: <ExamIcon />,
      label: "Quản lý kết quả thi",
    },
    {
      path: "/admin/manage-licenses",
      icon: <License />,
      label: "Quản lý giấy phép",
    },

    {
      path: "/admin/complaints",
      icon: <Complaint />,
      label: "Xử lý khiếu nại",
    },
  ];

  return (
    <div className="Sidebar">
      <div className="Sidebar-header">
        <img src={Logo} alt="Logo" className="Sidebar-logo" />
        <p>Vững tay lái – Chắc tương lai!</p>
      </div>
      <div className="Sidebar-container">
        <div className="Sidebar-above">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "Sidebar-item active" : "Sidebar-item"
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex">
                    <span className="Sidebar-icon">{item.icon}</span>
                    <span className="Sidebar-label">{item.label}</span>
                  </div>
                  {isActive && <ActiveArrow />}
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="Sidebar-below">
          <img src={TeamIcon} alt="Team" />
          <Button text="ĐI ĐẾN WEBSITE" isPrimary={true} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
