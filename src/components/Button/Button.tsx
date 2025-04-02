import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isPrimary = false,
  onClick,
}) => {
  return (
    <button
      className={`Button ${
        isPrimary ? "Button--primary" : "Button--secondary "
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
