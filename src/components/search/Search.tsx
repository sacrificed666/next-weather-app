"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCity } from "@/store/slices/citySlice";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      dispatch(setCity(inputValue.trim()));
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full p-1 flex justify-center items-center border border-white/5 rounded-full bg-white/5 backdrop-blur-md shadow-md">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Lviv"
        className="min-w-0 flex-1 h-8 md:h-10 p-4 md:p-5 outline-none placeholder:text-white/50"
      />
      <button type="submit" className="size-8 md:size-10 border border-white/5 rounded-full bg-white/5 backdrop-blur-md shadow-md"></button>
    </form>
  );
};

export default Search;
