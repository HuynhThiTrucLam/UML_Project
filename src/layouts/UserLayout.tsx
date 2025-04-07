import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/HeaderUser";
import Calendar from "../pages/Calendar/Calendar";
import Fee from "../pages/Fee/Fee";
import Home from "../pages/Home/Home";
import Complaint from "../pages/Complain/Complaint";
import File from "../pages/Profile/Profile";

const UserLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/profile" element={<File />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserLayout;
