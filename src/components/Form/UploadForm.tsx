import React from "react";
import "./Form.scss";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FileIcon from "../../assets/icons/File";

const UploadForm = () => {
  return (
    <div className="Form-upload">
      <div className="Form-upload-container">
        <p>* Mặt trước CCCD</p>
        <div className="Form-upload-import">
          <FileIcon />
          <span>
            Kéo và thả hình ảnh đây hoặc{" "}
            <span className="bold">Chọn file từ máy</span>
          </span>
          <Input id="picture" type="file" />
        </div>
      </div>
      <div className="Form-upload-container">
        <p>* Mặt sau CCCD</p>
        <div className="Form-upload-import">
          <FileIcon />
          <span>
            Kéo và thả hình ảnh đây hoặc{" "}
            <span className="bold">Chọn file từ máy</span>
          </span>
          <Input id="picture" type="file" />
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
