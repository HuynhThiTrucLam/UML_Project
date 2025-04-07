import { useState } from "react";
import PhoneIcon from "../../assets/icons/PhoneIcon.tsx";
import Button from "../../components/Button/Button";
import "./Fee.scss";
import QR from "../../assets/images/QR.png";
import blur from "../../assets/images/alias.png";
import Input from "../../components/Input/Input";
import { FileIcon } from "lucide-react";

const Fee = () => {
  const [identityCode, setIdentityCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [evidence, setEVidence] = useState<string>("");

  const handleSearchProfile = () => {
    //Goij API lay profile by phone number

    console.log("Laay profile code theo so dien thoai");
  };
  const handleSubmitEvidence = () => {
    if (!identityCode) {
      alert("Vui lòng nhập mã hồ sơ");
      return;
    }
    if (!evidence) {
      alert("Vui lòng tải lên minh chứng thanh toán");
      return;
    }

    //Goi API submit evidence
    console.log("Submit evidence");
  };

  return (
    <div className="Fee">
      <div className="Fee-container">
        <div className="Fee-landing">
          <div className="Fee-header">
            <PhoneIcon></PhoneIcon>
            <h1 className="Fee-title">Nộp học phí</h1>
          </div>
          <p className="Fee-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className="Fee-search">
            <div className=" w-full flex flex-row justify-between items-start gap-[1rem]">
              <Input
                placeholder="Nhập số số CCCD/CMND đã dùng để đăng ký hồ sơ tại đây"
                isForce={true}
                onChange={(e) => setIdentityCode(e.target.value)}
                className="w-full"
                value={identityCode}
              ></Input>
              <Input
                placeholder="Nhập số điện thoại dùng để nhận lại mã hồ sơ tại đây"
                isForce={true}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
                value={phoneNumber}
              ></Input>
            </div>
            <Button
              text="TRA CỨU NGAY"
              isPrimary={true}
              onClick={handleSearchProfile}
            />
          </div>
        </div>
        <div className="Fee-action">
          <div className="Fee-instruction">
            <h3>Hướng dẫn nộp lệ phí thi</h3>
            <div className="Fee-instruction-container">
              <div className="step1">
                <p className="title">
                  Bước 1: Chuyển khoản học phí theo hướng dẫn bên dưới.
                </p>
                <ul>
                  <li>
                    - Học viên tiến hành quét mã QR bên dưới để thanh toán lệ
                    phí thi.
                  </li>
                  <li>
                    - Nhập các thông tin chuyển khoản như sau:
                    <div className="content">
                      <p>
                        <span>Nội dung chuyển khoản:</span> Mã hồ sơ_Số điện
                        thoại (VD: A01B2_0123456789)
                      </p>
                    </div>
                    <div className="content">
                      <p>
                        <span>Số tiền cần chuyển: </span>
                        Được thông báo qua email hoặc tin nhắn
                      </p>
                    </div>
                  </li>
                  <li>
                    * Sau khi chuyển khoản thành công vui lòng chụp màn hình lưu
                    lại minh chứng.
                  </li>
                </ul>
                <div
                  className="Fee-QR flex
                  justify-between items-end mt-4"
                >
                  <img src={QR} alt="" />
                  <div className="Fee-QR-right flex flex-col gap-[8px]">
                    <div className="content">
                      <p>
                        <span>Ngân hàng:</span> Sacombank
                      </p>
                    </div>
                    <div className="content">
                      <p>
                        <span>Tên tài khoản:</span> Trung tâm Đào tạo và Sát
                        hạch lái xe
                      </p>
                    </div>
                    <div className="content">
                      <p>
                        <span>Số tài khoản:</span> 0123456789
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step2">
                <p className="title">
                  Bước 2: Điền thông tin vào biểu mẫu bên phải{" "}
                </p>
                <ul>
                  <li>
                    - Nhập mã hồ sơ là 6 số được gửi tới email hoặc số điện
                    thoại của học viên (Hoặc có thể tra cứu mã hồ sơ thông qua
                    số điện thoại) vào ô Mã hồ sơ
                  </li>
                  <li>
                    <p className="font-light">
                      * Hình ảnh minh hoạ mã hồ sơ gửi đến email
                    </p>
                    <img src={blur} alt="" />
                  </li>
                  <li>
                    <p className="font-light">
                      * Hình ảnh minh hoạ mã hồ sơ gửi đến số điện thoại
                    </p>
                    <img src={blur} alt="" />
                  </li>
                  <li className="flex">
                    - Dán minh chứng chuyển khoản thành công ở bước một vào ô
                    Minh chứng thanh toán.
                  </li>
                  <li className="flex">
                    - Nhấn Nút Xác nhận để hoàn thành quá trình nộp lệ phí.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Fee-instruction">
            <h3>Biểu mẫu xác nhận hoàn thành lệ phí</h3>
            <div className="Fee-instruction-container">
              <Input
                placeholder="VD: ABC"
                isForce={true}
                label="Mã hồ sơ"
                onChange={() => {}}
                className="w-full"
                value={identityCode}
              ></Input>
              <div className="Fee-upload">
                <p>* Tải lên minh chứng nộp học phí</p>
                <div className="Form-upload-import">
                  <FileIcon />
                  <span>
                    Kéo và thả hình ảnh đây hoặc{" "}
                    <span className="bold">Chọn file từ máy</span>
                  </span>
                  <input
                    type="file"
                    onChange={(e: any) => setEVidence(e.target.value)}
                  />
                </div>
                <div className="Fee-upload-format">
                  <span>Hỗ trợ các tệp PDF, JPEG, PNG</span>
                  <span>Kích thước tối đa: 20MB</span>
                </div>
              </div>
              <Button
                text="NỘP MINH CHỨNG XÁC NHẬN"
                isPrimary={true}
                onClick={handleSubmitEvidence}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fee;
