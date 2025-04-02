import React from "react";
import Button from "../Button/Button";
import Logo from "../../assets/images/logo.png";
import Email from "../../assets/icons/Email";
import Address from "../../assets/icons/Address";
import Phone from "../../assets/icons/Phone";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        {/* Top Section */}
        <div className="Footer-top">
          <div className="Footer-left">
            <img src={Logo} alt="Logo" className="Footer-logo" />
            <p className="Footer-description">
              Trung tâm cam kết đào tạo học viên với chất lượng cao, giúp bạn tự
              tin cầm lái an toàn
            </p>
          </div>
          <div className="Footer-right">
            <p className="Footer-title">Vững tay lái – Chắc tương lai!</p>
            <Button text="ĐĂNG KÝ THI NGAY" isPrimary={false} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="Footer-bottom">
          <div className="Footer-grid">
            <h3 className="Footer-title">Thông tin liên hệ</h3>
            <a
              href="mailto:trungtamsathachlaixe@gmail.com"
              className="Footer-infor"
            >
              <Email />
              <span className="title">Địa chỉ email:</span>
              <span>ttsathachlaixe@gmail.com</span>
            </a>
            <a href="#" className="Footer-infor">
              <Address />

              <span className="title">Địa chỉ:</span>
              <span>123 Đường ABC, Quận XYZ</span>
            </a>
            <a href="tel:0123456789" className="Footer-infor">
              <Phone />
              <span className="title">Số điện thoại:</span>
              <span>0123456789</span>
            </a>
          </div>

          {/* Main Services */}
          <div className="Footer-grid">
            <h3 className="Footer-title">Các dịch vụ chính</h3>

            <p>Đào tạo lái xe các hạng (A1, A2, B1, B2, C)</p>
            <p>Sát hạch bằng lái xe</p>
            <p>Ôn luyện thi lý thuyết và thực hành</p>
          </div>

          {/* Online Services */}
          <div className="Footer-grid">
            <h3 className="Footer-title">Các dịch vụ online</h3>
            <p>Đăng ký thi trực tuyến</p>
            <p>Tra cứu bằng và kết quả thi</p>
            <p>Hướng dẫn hồ sơ và thủ tục</p>
          </div>

          {/* Working Hours */}

          <div className="Footer-grid">
            <h3 className="Footer-title">Thời gian làm việc</h3>
            <div className="Footer-infor">
              <span className="title">Thời gian làm việc:</span>
              <span>Thứ 2 - Thứ 6</span>
            </div>
            <div className="Footer-infor">
              <span className="title">Giờ làm việc:</span>
              <span>8:00 sáng - 18:00 tối</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
