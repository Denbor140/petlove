"use client";

import CustomSelect, {
  SelectOption,
} from "@/components/CustomSelect/CustomSelect";
import css from "./NoticesPage.module.css";
import NoticesList from "@/components/NoticesList/NoticesList";
import Pagination from "@/components/Pagination/Pagination";
import SearchField from "@/components/SearchField/SearchField";
import Title from "@/components/Title/Title";
import {
  getNotices,
  getNoticesCategories,
  getNoticesGender,
  GetNoticesResponse,
  getNoticesSpecies,
} from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const LIMIT = 6;

export default function NoticesPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  const { data: filterOptions } = useQuery({
    queryKey: ["notices-filters"],
    queryFn: async () => {
      const [categories, genders, species] = await Promise.all([
        getNoticesCategories(),
        getNoticesGender(),
        getNoticesSpecies(),
      ]);
      return { categories, genders, species };
    },
    staleTime: Infinity,
  });

  const { data } = useQuery<GetNoticesResponse>({
    queryKey: ["notices", page, searchText, category, gender, species],
    queryFn: () =>
      getNotices({
        keyword: searchText,
        page,
        limit: LIMIT,
        category,
        gender,
        species,
      }),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const categoryOptions: SelectOption[] = [
    { label: "Show all", value: "" },
    ...(filterOptions?.categories.map((c) => ({
      label: c.charAt(0).toLocaleUpperCase() + c.slice(1),
      value: c,
    })) ?? []),
  ];

  const genderOptions: SelectOption[] = [
    { label: "Show all", value: "" },
    ...(filterOptions?.genders.map((g) => ({
      label: g.charAt(0).toLocaleUpperCase() + g.slice(1),
      value: g,
    })) ?? []),
  ];

  const speciesOptions: SelectOption[] = [
    { label: "Show all", value: "" },
    ...(filterOptions?.species.map((s) => ({
      label: s.charAt(0).toLocaleUpperCase() + s.slice(1),
      value: s,
    })) ?? []),
  ];

  return (
    <main>
      <div className="container">
        <Title title="Find your favorite pet" marginBottom="40px" />
        <section className={css.notices_filter_section}>
          <div className={css.notices_filter_container}>
            <SearchField keyword={searchText} onSearch={handleSearch} />
            <div className={css.notices_filters_top}>
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setPage(1);
                }}
                placeholder="Category"
              />
              <CustomSelect
                options={genderOptions}
                value={gender}
                onChange={(value) => {
                  setGender(value);
                  setPage(1);
                }}
                placeholder="Gender"
              />
            </div>
            <CustomSelect
              options={speciesOptions}
              value={species}
              onChange={(value) => {
                setSpecies(value);
                setPage(1);
              }}
              placeholder="By type"
            />
          </div>
        </section>
        <section className={css.notices_section}>
          <NoticesList notices={data?.results ?? []} />
        </section>
        <Pagination
          pageCount={data?.totalPages ?? 1}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
