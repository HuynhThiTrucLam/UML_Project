import React from "react";

import "./Course.scss";
import { HealthCheckProps } from "../../store/type/HealthCheckType";

const HealthCheck = (healthCheckData: HealthCheckProps) => {
  return (
    <div className="Course">
      <div className="Course-container">
        <p className="Course-heading">{healthCheckData.data.name}</p>
        <p>Ngày khám: {healthCheckData.data.date}</p>
        <p>Địa chỉ: {healthCheckData.data.address}</p>
      </div>
    </div>
  );
};

export default HealthCheck;
