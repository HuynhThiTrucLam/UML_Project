import React from "react";
import NoDataIcon from "../../assets/icons/NoData";

const NoData = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center w-full h-full">
      <NoDataIcon />
      <p className="text-light text-center mt-4">
        Hiện chưa có khoá học nào được mở.
      </p>
      <p className="font-[var(--font-light) !important]">
        {" "}
        Vui lòng quay lại vào thời gian khác.
      </p>
    </div>
  );
};

export default NoData;
