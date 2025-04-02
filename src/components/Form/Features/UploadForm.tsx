import "../Form.scss";

import FileIcon from "../../../assets/icons/File";
import { PersonalImgData } from "../../../store/type/Student";

interface UploadFormProps {
  onFormDataChange: (data: Partial<PersonalImgData>) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFormDataChange }) => {
  const handleChange = (field: keyof PersonalImgData, value: string) => {
    onFormDataChange({ [field]: value });
  };
  return (
    <div className="Form-upload">
      <div className="Form-upload-container">
        <p>* Tải lên ảnh chân dung</p>
        <div className="Form-upload-import">
          <FileIcon />
          <span>
            Kéo và thả hình ảnh đây hoặc{" "}
            <span className="bold">Chọn file từ máy</span>
          </span>
          <input
            type="file"
            onChange={(e: any) => handleChange("avatar", e.target.value)}
          />
        </div>
      </div>
      <div className="Form-upload-container">
        <p>* Tải lên hình ảnh mặt trước CCCD</p>
        <div className="Form-upload-import">
          <FileIcon />
          <span>
            Kéo và thả hình ảnh đây hoặc{" "}
            <span className="bold">Chọn file từ máy</span>
          </span>
          <input
            type="file"
            onChange={(e) => onFormDataChange({ cardImgFront: e.target.value })}
          />
        </div>
      </div>
      <div className="Form-upload-container">
        <p>* Tải lên hình ảnh mặt sau CCCD</p>
        <div className="Form-upload-import">
          <FileIcon />
          <span>
            Kéo và thả hình ảnh đây hoặc{" "}
            <span className="bold">Chọn file từ máy</span>
          </span>
          <input
            type="file"
            onChange={(e) => onFormDataChange({ cardImgBack: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
