"use client";

import { useState } from "react";
import css from "./CustomSelect.module.css";
import { usePathname } from "next/navigation";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const selectedOption = options.find(
    (option) => option.value === value && value !== "",
  );

  return (
    <div className={css.select_container}>
      <div
        className={css.select_value}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={
            selectedOption && pathname === "/profile/add-pet"
              ? css.value_selected
              : ""
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <svg
          width={18}
          height={18}
          className={`${css.select_icon} ${open ? css.icon_open : ""}`}
        >
          <use href="/icons.svg#icon-chevron-down"></use>
        </svg>
      </div>

      <div
        className={`${css.dropdown_container} ${
          open ? css.dropdown_container_open : ""
        }`}
      >
        <ul
          className={`${css.dropdown_list} ${pathname === "/profile/add-pet" ? css.dropdown_list_pet : ""}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.select_option} ${
                value === option.value ? css.select_option_active : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
