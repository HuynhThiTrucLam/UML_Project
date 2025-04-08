import React, { useState } from "react";
import "./Login.scss";
import LoginImage from "../../assets/images/login.png"; // Assuming you have a login image in your assets
import Logo from "../../assets/images/Logo-blue.png"; // Assuming you have a logo image in your assets
import Input from "../../components/Input/Input";
import { Checkbox } from "../../components/ui/checkbox";
import Button from "../../components/Button/Button";
import GoogleIcon from "../../assets/images/google.png"; // Assuming you have a Google icon in your assets

const mockuser = {
  username: "admin",
  password: "admin",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === mockuser.username && password === mockuser.password) {
      alert("Đăng nhập thành công");
      // Redirect to the dashboard or another page
      window.location.href = "/admin/dashboard"; // Replace with your actual dashboard route
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
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
            }}
          />
          <Input
            label="Mật khẩu"
            placeholder="Mật khẩu"
            className="Login-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
          <div className="Login-line">
            <span>Hoặc đăng nhập với</span>
          </div>

          <div className="Login-another">
            <img src={GoogleIcon} alt="" />
            <span>Đăng nhập với tài khoản Google</span>
          </div>
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
