import { HealthCheckType } from "../../store/type/HealthCheck";
import "./Course.scss";

interface HealthCheckProps {
  data: HealthCheckType;
  onClick: (healthCheckId: string) => void;
  isSelected?: boolean;
}

const HealthCheck = ({ data, isSelected, onClick }: HealthCheckProps) => {
  return (
    <div
      className={`Course ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(data.id)}
    >
      <div className="Course-container">
        <p className="Course-heading">{data.name}</p>
        <p>Ngày khám: {data.date}</p>
        <p>Địa chỉ: {data.address}</p>
      </div>
    </div>
  );
};

export default HealthCheck;
