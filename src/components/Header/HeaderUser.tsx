import React from "react";
import Logo from "../../assets/images/Logo-blue.png";
import "./HeaderUser.scss";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "Xem lịch học", path: "/calendar" },
    { title: "Nộp học phí", path: "/fee" },
    { title: "Tra cứu hồ sơ", path: "/profile" },
    { title: "Khiếu nại", path: "/complaint" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => handleNavigate("/")}>
          <img src={Logo} alt="Logo" className="header-logo-img" />
        </div>
        <nav className="header-nav">
          <ul className="header-menu">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`header-item ${
                  location.pathname === item.path ? "header-item--active" : ""
                }`}
                onClick={() => handleNavigate(item.path)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderUser;
