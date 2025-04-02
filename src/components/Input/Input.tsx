import { useState } from "react";
import "./Input.scss";

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  isForce?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  isForce,
  value,
  onChange,
}) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    setError(value.trim() === "");
  };

  return (
    <div className="Input flex flex-col w-full max-w-md">
      <label className="Input-label font-semibold">
        {isForce ? `* ${label}` : label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="border border-gray-600 p-2 focus:outline-blue-500"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          * Không được để trống thông tin này
        </p>
      )}
    </div>
  );
};

export default Input;
