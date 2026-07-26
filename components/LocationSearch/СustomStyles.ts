import { StylesConfig } from "react-select";
import { LocationOption } from "./LocationSearch";

export const customStyles = (
  hasValue: boolean,
): StylesConfig<LocationOption, false> => ({
  control: (base, state) => ({
    ...base,
    borderRadius: "30px",
    minHeight: "42px",
    paddingRight: "60px",
    boxShadow: "none",
    borderColor:
      state.isFocused || hasValue ? "var(--secondary-color)" : "transparent",
    "&:hover": {
      borderColor:
        state.isFocused || hasValue ? "var(--secondary-color)" : "transparent",
    },
    cursor: "pointer",
    transition: "all 300ms ease-in-out",
  }),
  placeholder: (base) => ({
    ...base,
    color: "currentColor",
    lineHeight: "1.29",
    letterSpacing: "-0.03em",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "15px",
    marginTop: "4px",
    padding: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    animation: "fadeInMenu 300ms ease-in-out",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isSelected ? "#fff" : "#262626",
    cursor: "pointer",
    lineHeight: "1.29",
    letterSpacing: "-0.03em",
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: "var(--secondary-color)",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#262626",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "calc(100% - 4px)",
    lineHeight: "1.29",
    letterSpacing: "-0.03em",
  }),
  input: (base) => ({
    ...base,
    color: "#262626",
  }),
  valueContainer: (base) => ({
    ...base,
    overflow: "hidden",
    paddingRight: "0",
  }),
});
