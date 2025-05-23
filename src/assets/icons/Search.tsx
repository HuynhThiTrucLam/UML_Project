import React from "react";

interface SearchProps {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

const Search = ({ width, height, className, onClick }: SearchProps) => {
  return (
    <div>
      <svg
        width={width ? width : "46"}
        height={height ? height : "46"}
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
      >
        <path
          d="M45 45L32.2968 32.2968M32.2968 32.2968C35.7349 28.8586 37.6665 24.1955 37.6665 19.3332C37.6665 14.471 35.7349 9.80782 32.2968 6.36968C28.8586 2.93153 24.1955 1 19.3332 1C14.471 1 9.80782 2.93153 6.36968 6.36968C2.93153 9.80782 1 14.471 1 19.3332C1 24.1955 2.93153 28.8586 6.36968 32.2968C9.80782 35.7349 14.471 37.6665 19.3332 37.6665C24.1955 37.6665 28.8586 35.7349 32.2968 32.2968Z"
          stroke="#01284F"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Search;
