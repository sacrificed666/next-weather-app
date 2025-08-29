"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCity } from "@/store/slices/citySlice";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      dispatch(setCity(input.trim()));
      setInput("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="base max-w-md w-full p-1 border rounded-full">
      <input value={input} onChange={handleChange} type="text" name="city" placeholder="Lviv, UA" aria-label="Enter city name" className="min-w-0 h-8 md:h-10 p-4 md:p-5 flex-1 outline-none placeholder:text-white/50" />
      <button type="submit" aria-label="Submit city search" className="base size-8 md:size-10 p-1 md:p-2 border rounded-full cursor-pointer active:scale-90 transition-all">
        <img src="/search.svg" alt="Search" className="size-6 opacity-50" />
      </button>
    </form>
  );
};

export default Search;
