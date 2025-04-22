import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Notfound from "./pages/NotFound/Notfound";
import "./App.css";
import Login from "./pages/Login/Login";
import AdminLayout from "./layouts/AdminLayout";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserLayout />} />

        {/* Admin Login Page - Accessible without authentication */}
        <Route path="/admin/login" element={<Login />} />

        {/* Redirect /admin to /admin/dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
