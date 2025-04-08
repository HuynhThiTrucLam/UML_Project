import Avartar from "../../assets/icons/Avaratr";
import Notification from "../../assets/icons/Notification";
import SearchBar from "../Searchbar/SearchBar";
import "./HeaderAdmin.scss";

const mockUser = {
  username: "admin",
  position: "Quản trị viên",
};

const HeaderAdmin = () => {
  return (
    <div className="AdminHeader">
      <div className="AdminHeader-container">
        <div className="AdminHeader-contact">
          <p>Số điện thoại Hotline:</p>
          <p className="title">01234567890</p>
        </div>
        <div className="AdminHeader-contact">
          <p>Đường dẫn trang Portal:</p>
          <p className="title">trungtam@gmail.com</p>
        </div>
        <div className="AdminHeader-searchbar">
          <SearchBar />
        </div>
        <div className="AdminHeader-account">
          <Avartar />
          <div className="AdminHeader-account-content">
            <p className="AdminHeader-account-name">{mockUser.username}</p>
            <p className="AdminHeader-account-position">{mockUser.position}</p>
          </div>
        </div>
        <div className="AdminHeader-notification">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
