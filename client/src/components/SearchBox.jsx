import React, { useState } from "react";
import { Input } from "./ui/input";
// import { CiSearch } from "react-icons/ci";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Blogs Here..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-9 rounded-full w-md flex justify-between items-center"
      />{" "}
      {/* <CiSearch /> */}
    </form>
  );
};

export default SearchBox;
