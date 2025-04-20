export interface HealthCheckType {
  id: string;
  name: string;
  date: string;
  address: string;
  courseId: string;
}

export interface HealthCheckDocument {
  id: string;
  studentId: string;
  courseId: string;
  docURL: string;
}

export interface HealthCheckProps {
  data: HealthCheckType;
  onClick: (healthCheckId: string) => void;
}
