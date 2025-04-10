import { useEffect, useState } from "react";
import FileIcon from "../../../assets/icons/File";
import Input from "../../../components/Input/Input";

import Button from "../../../components/Button/Button";
import Selection from "../../../components/Select/Select";
import { Textarea } from "../../../components/ui/textarea";
import { AbsentFormType } from "../../../store/type/DelayForm";

const typeOfAbsentData = [
  { id: 1, name: "Đơn xin Hoãn thi" },
  { id: 2, name: "Đơn xin Hoãn học" },
  { id: 3, name: "Đơn xin Đổi lịch dạy" },
];

const AbsentForm = () => {
  const [typeOfAbsentList, setTypeOfAbsentList] = useState<any>([]);

  const [identityID, setIdentityID] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [demonstration, setDemonstration] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [typeOfAbsent, setTypeOfAbsent] = useState<string>(
    typeOfAbsentData[0].name
  );

  const handleSubmit = () => {
    if (!identityID) {
      alert("Vui lòng nhập Mã học viên / Mã giáo viên.");
      return;
    }
    if (!reason) {
      alert("Vui lòng nhập lý do.");
      return;
    }
    if (!phone) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    console.log("Ddawng ky thanh coong");
    // Create a FormData object
    const formData: AbsentFormType = {
      identityID,
      typeOfAbsent,
      phone,
      email,
      reason,
      demonstration,
    };
    // Call API to submit the form data

    console.log("Form data submitted:", formData);
    alert("Đăng ký thành công!");
  };

  useEffect(() => {
    //dung api de lay chuc vu
    setTypeOfAbsentList(typeOfAbsentData);
  });

  return (
    <div className="Calendar-absent">
      <div className="Calendar-absent-container">
        <div className="Calendar-absent-heading">
          <h1>Đăng ký dời lịch học / Lịch dạy / Lịch thi</h1>
          <div className=".description">
            <p>
              Vui lòng điền đầy đủ thông tin vào biểu mẫu dưới đây để hoàn tất
              đăng ký hoãn lịch thi / lịch học / lịch dạy.
            </p>
            <p>
              Các trường có dấu (*) là bắt buộc. Đảm bảo rằng thông tin cung cấp
              chính xác để tránh sai sót trong quá trình xét duyệt yêu cầu.
            </p>
          </div>
        </div>

        <div className="Calendar-absent-wrap">
          <div className="Calendar-absent-form">
            <Input
              label="Mã học viên / Mã giáo viên"
              placeholder="VD: 123456"
              isForce={true}
              onChange={(e: any) => {
                setIdentityID(e.target.value);
              }}
            />

            <div className="Calendar-select">
              <p>* Loại đơn</p>
              <Selection
                placeholder={typeOfAbsent}
                data={typeOfAbsentList}
                setData={setTypeOfAbsent}
              ></Selection>
              {/* <Select>
                <SelectTrigger className="Calendar-select-container">
                  <SelectValue placeholder={typeOfAbsent} />
                </SelectTrigger>
                <SelectContent className="Calendar-select-container">
                  <SelectGroup>
                    <SelectLabel>Chức vụ</SelectLabel>
                    {typeOfAbsentList.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={item.name}
                        onClick={() => {
                          setTypeOfAbsent(item.name);
                        }}
                        className="text-[12px]"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>

            <Input
              label="Số điện thoại"
              placeholder="VD: 0123456789"
              isForce={true}
              onChange={(e: any) => {
                setPhone(e.target.value);
              }}
            />

            <Input
              label="Địa chỉ email"
              placeholder="VD: nguyenVanA@gmail.com"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />

            <div className="Calendar-select">
              <p>* Lý do</p>
              <Textarea
                placeholder="Viết rõ lý do tại đây"
                onChange={(e: any) => {
                  setReason(e.target.value);
                }}
              />
            </div>

            <div className="Calendar-upload-container">
              <p>* Tải lên minh chứng</p>
              <div className="Form-upload-import">
                <FileIcon />
                <span>
                  Kéo và thả hình ảnh đây hoặc{" "}
                  <span className="bold">Chọn file từ máy</span>
                </span>
                <input
                  type="file"
                  onChange={(e: any) => {
                    setDemonstration(e.target.files[0]);
                    console.log(e.target.files);
                  }}
                />
              </div>
            </div>
          </div>
          <Button text="Gửi yêu cầu" isPrimary={true} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AbsentForm;
