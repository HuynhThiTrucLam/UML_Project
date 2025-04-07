import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import LogoBlue from "../../assets/images/Logo-blue.png";
import Background from "../../assets/images/background.png";
import Slogan from "../../assets/images/Slogan.png";
import Traffic from "../../assets/images/Traffic.png";
import "./Home.scss";
import { Card } from "../../components/Card/Card";
import {
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaRegClipboard,
  FaRegCreditCard,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import Form from "../../components/Form/Form";

const Home = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="Home">
      <div className="Home-top">
        <div className="Home-container">
          <div className="Home-heading">
            <img src={LogoBlue} alt="Logo" className="Footer-logo" />
            <p className="description">
              Trung tâm cam kết đào tạo học viên với chất lượng cao, giúp bạn tự
              tin cầm lái an toàn
            </p>
            <p className="p">Vững tay lái – Chắc tương lai!</p>
            <Button
              text="ĐĂNG KÝ THI NGAY"
              isPrimary={true}
              onClick={scrollToForm}
            />
          </div>
          <img className="Home-image" alt="Image" src={Background} />
        </div>
      </div>
      <div className="Home-nav">
        <div className="Home-nav-container">
          <Card
            desc="Xem các Khoá học Lịch thi, Lịch học, Nộp đơn hoãn học, hoãn thi"
            feature="Xem lịch học, lịch thi"
            icon={<FaRegCalendarAlt size={24} />}
            className="card"
            img="https://plus.unsplash.com/premium_photo-1741194732682-21f3046cf1a6?q=80&w=2433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            onClick={() => navigate("/calendar")}
          />
          <Card
            desc="Xem tình trạng hồ sơ"
            feature="Tra cứu hồ sơ thi"
            icon={<FaRegFileAlt size={24} />}
            className="card"
            img="https://images.unsplash.com/photo-1593642633279-3a2f8b1f6c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            onClick={() => navigate("/profile")}
          />
          {/* <Card
            desc="Xem các Khoá học Lịch thi, Lịch học"
            feature="Tra cứu kết quả thi"
            icon={<FaRegClipboard size={24} />}
            className="card"
            onClick={() => navigate("/calendar")}
          /> */}
          <Card
            desc="Xem các Khoá học Lịch thi, Lịch học"
            feature="Thanh toán học phí"
            icon={<FaRegCreditCard size={24} />}
            className="card"
            onClick={() => navigate("/fee")}
          />
          <Card
            desc="Xem các Khoá học Lịch thi, Lịch học"
            feature="Nộp đơn khiếu nại"
            icon={<FaExclamationCircle size={24} />}
            className="card"
            onClick={() => navigate("/complaint")}
          />
        </div>
      </div>
      <div className="Home-intro">
        <div className="Home-intro-container">
          <div className="Home-intro-slogan">
            <img src={Slogan} alt="Slogan" />
          </div>
          <div className="Home-intro-main">
            <div className="Home-intro-quality">
              <p>
                Cam kết <br></br>chất lượng đào tạo
              </p>
              <div className="Home-intro-content">
                <div className="content">
                  <p className="title">
                    Chương trình đào tạo bài bản, đạt chuẩn
                  </p>
                  <p>
                    Đào tạo cả lý thuyết và thực hành với lộ trình học rõ ràng,
                    khoa học.
                  </p>
                </div>
                <div className="content">
                  <p className="title">
                    Chương trình đào tạo bài bản, đạt chuẩn
                  </p>
                  <p>
                    Đào tạo cả lý thuyết và thực hành với lộ trình học rõ ràng,
                    khoa học.
                  </p>
                </div>
                <div className="content">
                  <p className="title">
                    Chương trình đào tạo bài bản, đạt chuẩn
                  </p>
                  <p>
                    Đào tạo cả lý thuyết và thực hành với lộ trình học rõ ràng,
                    khoa học.
                  </p>
                </div>
              </div>
            </div>
            <div className="Home-intro-video">
              <div className="container relative w-full h-full">
                <iframe
                  className="absolute bottom-0 left-0 w-full"
                  src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ftrungtamlaixehocmon%2Fvideos%2F851593163190957%2F&show_text=false&width=560&t=0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
            <div className="Home-intro-infor">
              <img src={Traffic} alt="Traffic" />
              <div className="overlay"></div>
              <div className="CTA">
                <p>0123456789</p>
                <p>trungtamdaotao@gmail.com</p>
                <p>Tang Nhon Phu A, Quan 9, Thành phố Hồ Chí Min</p>
              </div>
            </div>
            <div className="Home-intro-number">
              <p className="number">1000+</p>
              <p className="title">Học viên được cấp bằng</p>
              <p className="description">
                Trung tâm cam kết đào tạo học viên với chất lượng cao, giúp bạn
                tự tin cầm lái an toàn
              </p>
            </div>
          </div>
          <div className="Home-contact">
            <a
              href="https://www.facebook.com/trungtamlaixehocmon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <AiOutlineFacebook size={24} />
            </a>
            <a
              href="https://www.youtube.com/@trungtamlaixehocmon/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <AiOutlineYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      <div ref={formRef}>
        <Form />
      </div>
    </div>
  );
};

export default Home;
