import React from "react";
import "./SearchBar.scss"; // Import your styles here
import Input from "../Input/Input";
import Search from "../../assets/icons/Search";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const SearchBar = ({
  value,
  placeholder,
  onChange,
  onSearch,
}: SearchBarProps) => {
  return (
    <div className="Searchbar">
      <Input
        value={value}
        className="Searchbar-input"
        placeholder={placeholder ? placeholder : "Bạn cần tìm gì?"}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(e.target.value)
        }
        enabledError={false}
      ></Input>

      <button
        className="Searchbar-button"
        onClick={() => onSearch && onSearch("")}
      >
        <Search width="16" height="16"></Search>
      </button>
    </div>
  );
};

export default SearchBar;
