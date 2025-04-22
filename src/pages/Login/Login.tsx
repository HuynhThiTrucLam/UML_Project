import React, { useState } from "react";
import "./Login.scss";
import LoginImage from "../../assets/images/login.png";
import Logo from "../../assets/images/Logo-blue.png";
import Input from "../../components/Input/Input";
import { Checkbox } from "../../components/ui/checkbox";
import Button from "../../components/Button/Button";
import { useAuth } from "../../store/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleLogin = async () => {
    try {
      const success = await login(username, password);
      if (success) {
        // Navigate to the page the user was originally trying to access
        navigate(from, { replace: true });
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <div className="Login-form">
          <img src={Logo} alt="Trung tâm đào tạo và sát hạch lái xe" />
          <h1>Đăng nhập vào tài khoản</h1>
          <Input
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            className="Login-input"
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
          <Input
            label="Mật khẩu"
            placeholder="Mật khẩu"
            className="Login-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-[12px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button text="Đăng nhập" isPrimary={true} onClick={handleLogin} />
        </div>
        <div className="Login-image">
          <img src={LoginImage} alt="" />
          <div className="Login-overlay"></div>
          <p>Vững tay lái – Chắc tương lai!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
