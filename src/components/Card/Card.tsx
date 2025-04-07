import React, { useReducer } from "react";
import NextIcon from "../../assets/icons/Next";
import "./Card.scss";

interface CardProps {
  desc: string;
  feature: string;
  icon: React.ReactNode;
  img?: string;
  className?: string;
  mouseEnter?: () => void;
  mouseLeave?: () => void;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  desc,
  feature,
  icon,
  img,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useReducer(
    (state: boolean) => !state,
    false
  );

  return (
    <div
      className="Card"
      onMouseEnter={setIsHovered}
      onMouseLeave={setIsHovered}
      onClick={onClick}
    >
      <div className="Card-container">
        <div className="Card-icon">{icon}</div>
        <h3 className="Card-header">{feature}</h3>
        <div className="Card-line"></div>
        <div className="Card-desc">
          <p className="Card-text">{desc}</p>
          <div className="Card-icon">
            <NextIcon />
          </div>
        </div>
      </div>
      <img className="Card-image" alt="Image" src={img} />
    </div>
  );
};
