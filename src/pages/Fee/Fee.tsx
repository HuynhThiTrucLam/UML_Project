import axios from "axios";
import { FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PhoneIcon from "../../assets/icons/PhoneIcon.tsx";
import QR from "../../assets/images/QR.png";
import blur from "../../assets/images/alias.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Selection from "../../components/Select/Select.tsx";
import { PaymentMethod } from "../../store/type/PaymentMethod.tsx";
import "./Fee.scss";
import { set } from "date-fns";

const Fee = () => {
  const [identityCode, setIdentityCode] = useState<string>("");
  const [isProfileIdValid, setIsProfileIdValid] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profileId, setProfileId] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [evidence, setEVidence] = useState<string>("");

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleCopyProfileId = () => {
    if (profileData) {
      navigator.clipboard.writeText(profileData);
      alert("Đã sao chép mã hồ sơ!");
    }
  };

  // Check if profileId exists in data
  const handleCheckProfileId = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          `/api/course_registration/identity_number/${identityCode}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log(data);

        const profileData = {
          id: data.id,
        };
        // console.info(profileData);
        setProfileData(profileData.id);
        setIsProfileIdValid(true);
      } else {
        setIsProfileIdValid(false);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsProfileIdValid(false);
    }
  };

  const handleSubmitFee = async () => {
    setIsLoading(true);

    try {
      var paymentCreate = {
        payment_method_id: selectedPaymentMethod,
        evidence: evidence,
        course_registration_id: profileId,
      };

      console.log("paymentCreate", paymentCreate);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payments/`,
        paymentCreate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Nộp học phí thành công!", {
          description:
            "Vui lòng kiểm tra email để biết thêm thông tin chi tiết.",
          duration: 6000,
          className: "[&>[data-icon]]:!text-green-500",
        });
        setIsLoading(false);
      } else {
        setSubmissionError(
          "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      setSubmissionError(
        "Không thể gửi thông tin thanh toán. Vui lòng thử lại sau."
      );
    }
  };

  const getPaymentMethod = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          "/api/payment_method/payment-methods/?skip=0&limit=100"
      );
      const data = await response.json();
      console.log(data);
      const paymentMethods = data.payment_methods.map((item: any) => ({
        id: item.id,
        name: item.method,
      }));
      setPaymentMethod(paymentMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

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
          <div className="flex flex-col gap-[1rem]">
            <div className="Fee-search">
              <div className=" w-full flex flex-row justify-between items-start gap-[1rem]">
                <Input
                  type="text"
                  placeholder="Nhập số CCCD/CMND/Hộ chiếu"
                  isForce={true}
                  value={identityCode}
                  onChange={(e) => setIdentityCode(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                text="TRA CỨU NGAY"
                isPrimary={true}
                onClick={handleCheckProfileId}
              />
            </div>
            {!isProfileIdValid && (
              <p className="error text-red-500 font-light text-[12px]">
                * Mã hồ sơ không tồn tại.
              </p>
            )}
            {profileData && (
              <div className="flex gap-3 items-center ">
                <p className="title text-[12px] font-semibold">
                  Mã hồ sơ của bạn là:{" "}
                  <span className="font-light">{profileData}</span>
                </p>
                <div
                  className="flex items-center gap-2 bg-[#F5F5F5] p-2 rounded-[8px] cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                  onClick={handleCopyProfileId}
                >
                  <p className="text-[12px]">Sao chép mã</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </div>
              </div>
            )}
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
                type="text"
                placeholder="VD: ABC"
                isForce={true}
                label="Mã hồ sơ"
                onChange={(e) => setProfileId(e.target.value)}
                className="w-full"
                value={profileId}
              ></Input>
              <Selection
                title="Chọn hình thức thanh toán"
                placeholder={"Vui lòng chọn hình thức thanh toán"}
                data={paymentMethod}
                setData={setSelectedPaymentMethod}
                value={selectedPaymentMethod}
              ></Selection>
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
              {submissionError && (
                <p className="error text-red-500 font-light text-[12px]">
                  {submissionError}
                </p>
              )}

              <Button
                text={isLoading ? "ĐANG XỬ LÝ..." : "NỘP MINH CHỨNG XÁC NHẬN"}
                isPrimary={true}
                onClick={handleSubmitFee}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fee;
