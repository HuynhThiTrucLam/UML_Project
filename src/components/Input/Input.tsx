import { useState } from "react";
import "./Input.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  value?: string;
  placeholder: string;
  isForce?: boolean;
  className?: string;
  type?: "text" | "password" | "email" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  isForce,
  value,
  type = "text",
  onChange,
}) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    setError(value?.trim() === "");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Input flex flex-col w-full">
      {label ? (
        <label className="Input-label font-semibold">
          {isForce ? `* ${label}` : label}
        </label>
      ) : null}
      <div className="Input-container relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="border border-gray-600 p-2 focus:outline-blue-500 w-full"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          * Không được để trống thông tin này
        </p>
      )}
    </div>
  );
};

export default Input;
