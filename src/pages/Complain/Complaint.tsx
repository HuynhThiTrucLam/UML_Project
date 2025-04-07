import { useState } from "react";
import ComplaintIcon from "../../assets/icons/Complaint";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import "./Complaint.scss";
import { Textarea } from "../../components/ui/textarea";
import Button from "../../components/Button/Button";

const typeOfComplaintList = [
  { id: 1, name: "Khiếu nại về kết quả thi" },
  { id: 2, name: "Khiếu nại về nhân viên tại trung tâm" },
  { id: 3, name: "Khác" },
];

const Complaint = () => {
  const [typeOfComplaint, setTypeOfComplaint] = useState<any>(null);
  const [reason, setReason] = useState<string>("");
  return (
    <div className="Complaint">
      <div className="Complaint-container">
        <div className="Complaint-landing">
          <div className="Complaint-header">
            <ComplaintIcon></ComplaintIcon>
            <h1 className="Complaint-title">Nộp đơn khiếu nại</h1>
          </div>
          <p className="Complaint-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="Form-select">
          <p>* Chọn Nội dung muốn khiếu nại</p>
          <Select>
            <SelectTrigger className="Form-select-container">
              <SelectValue placeholder="Nội dung khiếu nại" />
            </SelectTrigger>
            <SelectContent className="Form-select-container">
              <SelectGroup>
                <SelectLabel>Nội dung khiếu nại</SelectLabel>
                {typeOfComplaintList.map((item: any) => (
                  <SelectItem
                    key={item.id}
                    value={item.name}
                    onClick={() => setTypeOfComplaint(item.name)}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="Complaint-content">
            <p>* Lý do khiếu nại</p>
            <Textarea
              placeholder="Viết rõ lý do tại đây"
              onChange={(e: any) => {
                setReason(e.target.value);
              }}
            />
          </div>
          <Button
            text="Gửi khiếu nại"
            isPrimary={true}
            onClick={() => {
              console.log(typeOfComplaint);
              console.log(reason);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Complaint;
