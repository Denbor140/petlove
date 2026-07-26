import css from "./FilterButtons.module.css";

export type FilterValue = "popular" | "unpopular" | "cheap" | "expensive";

interface FilterOption {
  value: FilterValue;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "popular", label: "Popular" },
  { value: "unpopular", label: "Unpopular" },
  { value: "cheap", label: "Cheap" },
  { value: "expensive", label: "Expensive" },
];

interface FilterButtonsProps {
  value: FilterValue | null;
  onChange: (value: FilterValue | null) => void;
}

export default function FilterButtons({ value, onChange }: FilterButtonsProps) {
  return (
    <div className={css.filters_bottom_container}>
      {FILTER_OPTIONS.map((option) => (
        <div
          key={option.value}
          className={`${css.filter_bottom} ${
            value === option.value ? css.filter_bottom_active : ""
          }`}
        >
          <input
            type="radio"
            name="filter"
            id={option.value}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            hidden
          />
          <label htmlFor={option.value} className={css.filter_bottom_label}>
            {option.label}

            {value === option.value && (
              <button
                type="button"
                aria-label={`Clear ${option.label} filter`}
                onClick={() => onChange(null)}
              >
                <svg width={18} height={18} className={css.filter_icon_clear}>
                  <use href="/icons.svg#icon-clear"></use>
                </svg>
              </button>
            )}
          </label>
        </div>
      ))}
    </div>
  );
}
