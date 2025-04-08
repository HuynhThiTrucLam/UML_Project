import React from "react";
import "./SearchBar.scss"; // Import your styles here
import Search from "../../assets/images/Search.png";
import Input from "../Input/Input";
const SearchBar = () => {
  return (
    <div className="Searchbar">
      <Input
        className="Searchbar-input"
        placeholder="Tìm kiếm..."
        type="text"
        onChange={() => {}}
      ></Input>

      <button className="Searchbar-button">
        <img src={Search} alt="" />
      </button>
    </div>
  );
};

export default SearchBar;
