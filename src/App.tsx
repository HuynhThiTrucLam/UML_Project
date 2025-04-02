import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Notfound from "./pages/NotFound/Notfound";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/*" element={<UserLayout />} />

      {/* Admin Routes */}
      {/* <Route path="/admin/*" element={<AdminLayout />} /> */}

      {/* 404 Page */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
