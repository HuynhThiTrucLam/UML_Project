import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Footer from "../components/Footer/Footer";

const UserLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserLayout;
