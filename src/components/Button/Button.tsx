import React from "react";
import "./Button.scss";
import { cn } from "../../lib/utils";

interface ButtonProps {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isPrimary = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={cn(
        `Button ${isPrimary ? "Button--primary" : "Button--secondary "}`,
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
