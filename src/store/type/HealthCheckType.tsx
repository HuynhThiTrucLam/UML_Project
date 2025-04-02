export interface HealthCheckType {
  id: string;
  name: string;
  date: string;
  address: string;
}
export interface HealthCheckProps {
  data: HealthCheckType;
  onClick: (healthCheckId: string) => void;
}
