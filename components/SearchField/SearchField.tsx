"use client";

import { useState } from "react";
import css from "./SearchField.module.css";
import { usePathname } from "next/navigation";

interface SearchFieldProps {
  keyword: string;
  onSearch: (value: string) => void;
}

export default function SearchField({ keyword, onSearch }: SearchFieldProps) {
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(keyword);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <form className={css.search_container} onSubmit={handleSubmit}>
      <input
        name="text"
        placeholder="Search"
        className={`${css.search_input} ${pathname === "/notices" ? css.search_notices_input : ""} ${inputValue ? css.active_input : ""}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {inputValue && (
        <button
          type="button"
          className={css.clear_btn}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg width={18} height={18} className={css.clear_icon}>
            <use href="/icons.svg#icon-clear"></use>
          </svg>
        </button>
      )}

      <button type="submit" className={css.search_btn} aria-label="Search">
        <svg width={18} height={18} className={css.search_icon}>
          <use href="/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
  );
}
