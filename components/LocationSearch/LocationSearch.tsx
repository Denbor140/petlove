"use client";

import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import { getCities, getCitiesLocations } from "@/lib/api/clientApi";
import { City } from "@/types/city";
import css from "./LocationSearch.module.css";
import { useEffect, useState } from "react";
import { customStyles } from "./СustomStyles";
import { useQueryClient } from "@tanstack/react-query";

export interface LocationOption {
  value: string;
  label: string;
  city: City;
}

interface LocationSearchProps {
  value: LocationOption | null;
  onApply: (option: LocationOption | null) => void;
}

const formatOptionLabel = (city: City): string => {
  const parts = [city.cityEn, city.stateEn, city.countyEn].filter(Boolean);
  return parts.join(", ");
};

const mapCityToOption = (city: City): LocationOption => ({
  value: city._id,
  label: formatOptionLabel(city),
  city,
});

export default function LocationSearch({
  value,
  onApply,
}: LocationSearchProps) {
  const [draft, setDraft] = useState<LocationOption | null>(value);
  const [defaultOptions, setDefaultOptions] = useState<LocationOption[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const citiesLocation = async () => {
      const cities = await queryClient.fetchQuery({
        queryKey: ["cities-locations"],
        queryFn: getCitiesLocations,
        staleTime: 5 * 60 * 1000,
      });
      setDefaultOptions(cities.map(mapCityToOption));
    };

    citiesLocation();
  }, [queryClient]);

  const loadOptions = async (inputValue: string): Promise<LocationOption[]> => {
    if (inputValue.trim().length === 0) {
      return defaultOptions;
    }

    if (inputValue.trim().length < 3) {
      return [];
    }

    const cities = await queryClient.fetchQuery({
      queryKey: ["cities", inputValue.trim()],
      queryFn: () => getCities(inputValue.trim()),
      staleTime: 5 * 60 * 1000,
    });

    return cities.map(mapCityToOption);
  };

  const handleChange = (option: SingleValue<LocationOption>) => {
    setDraft(option);
  };

  const handleSearchClick = () => {
    onApply(draft);
  };

  const handleClear = () => {
    setDraft(null);
    onApply(null);
  };

  return (
    <div className={css.select_wrapper}>
      <AsyncSelect<LocationOption>
        instanceId="location-select"
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        value={draft}
        onChange={handleChange}
        placeholder="Location"
        noOptionsMessage={({ inputValue }) =>
          inputValue.length > 0 && inputValue.length < 3
            ? "Enter at least 3 characters"
            : "No locations found"
        }
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        styles={customStyles(!!draft)}
      />

      {draft && (
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

      <button
        type="button"
        className={css.search_btn}
        onClick={handleSearchClick}
        aria-label="Search"
      >
        <svg width={18} height={18} className={css.search_icon}>
          <use href="/icons.svg#icon-search"></use>
        </svg>
      </button>
    </div>
  );
}
